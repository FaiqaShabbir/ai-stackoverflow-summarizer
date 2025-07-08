import os
from typing import Dict, Any
from anthropic import Anthropic


class AnthropicService:
    def __init__(self):
        self.api_key = os.getenv("ANTHROPIC_API_KEY")
        if not self.api_key:
            raise ValueError("ANTHROPIC_API_KEY environment variable is required")
        
        self.client = Anthropic(api_key=self.api_key)
        self.model = "claude-3-sonnet-20240229"  # or "claude-3-haiku-20240307" for cost optimization
    
    async def search_and_summarize(self, query: str) -> Dict[str, Any]:
        """
        Use Anthropic Claude to search and get relevant information
        """
        try:
            response = await self._make_anthropic_request(
                f"Search for information about: {query}. Provide a comprehensive summary with key points and code examples if relevant."
            )
            
            return {
                "success": True,
                "content": response,
                "sources": []
            }
                    
        except Exception as e:
            return {
                "success": False,
                "error": f"Error calling Anthropic API: {str(e)}"
            }
    
    async def extract_stackoverflow_content(self, url: str) -> Dict[str, Any]:
        """
        Extract content from a StackOverflow URL
        """
        try:
            # Use Anthropic to directly analyze the URL
            prompt = f"""
            Please analyze this StackOverflow question URL and provide a comprehensive summary:
            {url}
            
            Include:
            1. The main question/problem
            2. Key solutions and answers
            3. Important code examples
            4. Technical insights and best practices
            
            Format your response as a detailed technical summary that can be used for further processing.
            """
            
            enhanced_content = await self._make_anthropic_request(prompt)
            
            return {
                "success": True,
                "title": f"StackOverflow Question Analysis",
                "content": enhanced_content,
                "tags": [],
                "source_url": url
            }
            
        except Exception as e:
            return {
                "success": False,
                "error": f"Error extracting StackOverflow content: {str(e)}"
            }
    

    
    async def _make_anthropic_request(self, prompt: str) -> str:
        """
        Make a request to Anthropic Claude API
        """
        try:
            response = self.client.messages.create(
                model=self.model,
                max_tokens=1000,
                messages=[
                    {
                        "role": "user",
                        "content": prompt
                    }
                ]
            )
            
            return response.content[0].text
            
        except Exception as e:
            raise Exception(f"Anthropic API request failed: {str(e)}")
    
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