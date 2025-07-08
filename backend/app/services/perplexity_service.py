import os
import httpx
import asyncio
from typing import Dict, Any, Optional
from bs4 import BeautifulSoup
from urllib.parse import urlparse


class PerplexityService:
    def __init__(self):
        self.api_key = os.getenv("PERPLEXITY_API_KEY")
        if not self.api_key:
            raise ValueError("PERPLEXITY_API_KEY environment variable is required")
        
        self.base_url = "https://api.perplexity.ai"
        self.headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }
    
    async def search_and_summarize(self, query: str) -> Dict[str, Any]:
        """
        Use Perplexity API to search and get relevant information
        """
        try:
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    f"{self.base_url}/chat/completions",
                    headers=self.headers,
                    json={
                        "model": "mixtral-8x7b-instruct",
                        "messages": [
                            {
                                "role": "system",
                                "content": "You are a helpful technical assistant. Provide concise, accurate information about technical topics."
                            },
                            {
                                "role": "user",
                                "content": f"Search for information about: {query}. Provide a comprehensive summary with key points and code examples if relevant."
                            }
                        ],
                        "max_tokens": 1000,
                        "temperature": 0.3
                    },
                    timeout=30.0
                )
                
                if response.status_code == 200:
                    data = response.json()
                    return {
                        "success": True,
                        "content": data["choices"][0]["message"]["content"],
                        "sources": data.get("sources", [])
                    }
                else:
                    return {
                        "success": False,
                        "error": f"Perplexity API error: {response.status_code}"
                    }
                    
        except Exception as e:
            return {
                "success": False,
                "error": f"Error calling Perplexity API: {str(e)}"
            }
    
    async def extract_stackoverflow_content(self, url: str) -> Dict[str, Any]:
        """
        Extract content from a StackOverflow URL
        """
        try:
            # First try to get content via Perplexity
            perplexity_result = await self.search_and_summarize(f"Summarize this StackOverflow question: {url}")
            
            if perplexity_result["success"]:
                return {
                    "success": True,
                    "title": self._extract_title_from_url(url),
                    "content": perplexity_result["content"],
                    "tags": self._extract_tags_from_url(url),
                    "source_url": url
                }
            
            # Fallback to direct web scraping
            return await self._scrape_stackoverflow_directly(url)
            
        except Exception as e:
            return {
                "success": False,
                "error": f"Error extracting StackOverflow content: {str(e)}"
            }
    
    async def _scrape_stackoverflow_directly(self, url: str) -> Dict[str, Any]:
        """
        Direct web scraping fallback for StackOverflow
        """
        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(url, timeout=30.0)
                
                if response.status_code == 200:
                    soup = BeautifulSoup(response.text, 'html.parser')
                    
                    # Extract question title
                    title_elem = soup.find('h1', {'class': 'question-hyperlink'})
                    title = title_elem.get_text().strip() if title_elem else "StackOverflow Question"
                    
                    # Extract question content
                    question_elem = soup.find('div', {'class': 'question'})
                    question_content = ""
                    if question_elem:
                        content_elem = question_elem.find('div', {'class': 'post-text'})
                        if content_elem:
                            question_content = content_elem.get_text().strip()
                    
                    # Extract answers
                    answers = []
                    answer_elems = soup.find_all('div', {'class': 'answer'})
                    for answer_elem in answer_elems[:3]:  # Get top 3 answers
                        content_elem = answer_elem.find('div', {'class': 'post-text'})
                        if content_elem:
                            answers.append(content_elem.get_text().strip())
                    
                    # Extract tags
                    tags = []
                    tag_elems = soup.find_all('a', {'class': 'post-tag'})
                    for tag_elem in tag_elems:
                        tags.append(tag_elem.get_text().strip())
                    
                    # Combine content
                    full_content = f"Question: {question_content}\n\n"
                    for i, answer in enumerate(answers, 1):
                        full_content += f"Answer {i}: {answer}\n\n"
                    
                    return {
                        "success": True,
                        "title": title,
                        "content": full_content,
                        "tags": tags,
                        "source_url": url
                    }
                else:
                    return {
                        "success": False,
                        "error": f"Failed to fetch URL: {response.status_code}"
                    }
                    
        except Exception as e:
            return {
                "success": False,
                "error": f"Error scraping StackOverflow: {str(e)}"
            }
    
    def _extract_title_from_url(self, url: str) -> str:
        """
        Extract a basic title from the URL
        """
        try:
            # This is a fallback - in practice, we'd get the actual title from the page
            parsed = urlparse(url)
            path_parts = parsed.path.split('/')
            if len(path_parts) > 2 and path_parts[1] == 'questions':
                return f"StackOverflow Question #{path_parts[2]}"
            return "StackOverflow Question"
        except:
            return "StackOverflow Question"
    
    def _extract_tags_from_url(self, url: str) -> list:
        """
        Extract tags from URL if present
        """
        try:
            # This is a simplified version - in practice, we'd parse the actual tags from the page
            return []
        except:
            return []
    
    async def get_technical_context(self, topic: str) -> str:
        """
        Get additional technical context for a topic
        """
        try:
            result = await self.search_and_summarize(f"Provide technical context about: {topic}")
            
            if result["success"]:
                return result["content"]
            else:
                return f"Unable to get context for {topic}: {result.get('error', 'Unknown error')}"
                
        except Exception as e:
            return f"Error getting technical context: {str(e)}" 