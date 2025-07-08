import os
import json
from typing import List, Dict, Any
from openai import OpenAI
from ..models import SummaryData


class OpenAIService:
    def __init__(self):
        api_key = os.getenv("OPENAI_API_KEY")
        if not api_key:
            raise ValueError("OPENAI_API_KEY environment variable is required")
        
        self.client = OpenAI(api_key=api_key)
        self.model = "gpt-4-turbo-preview"  # or "gpt-3.5-turbo" for cost optimization
    
    async def summarize_content(self, title: str, content: str, tags: List[str] | None = None) -> SummaryData:
        """
        Generate a summary of StackOverflow content using OpenAI
        """
        try:
            # Prepare the prompt for summarization
            prompt = self._create_summarization_prompt(title, content, tags)
            
            response = await self._make_openai_request(prompt)
            
            # Parse the response
            summary_data = self._parse_summary_response(response)
            
            return summary_data
            
        except Exception as e:
            raise Exception(f"Error in OpenAI summarization: {str(e)}")
    
    async def chat_response(self, message: str, context: str | None = None) -> str:
        """
        Generate a chat response for follow-up questions
        """
        try:
            prompt = self._create_chat_prompt(message, context)
            
            response = await self._make_openai_request(prompt)
            
            return response.strip()
            
        except Exception as e:
            raise Exception(f"Error in OpenAI chat: {str(e)}")
    
    def _create_summarization_prompt(self, title: str, content: str, tags: List[str] | None = None) -> str:
        """
        Create a structured prompt for summarization
        """
        tag_info = f"Tags: {', '.join(tags) if tags else 'Not specified'}"
        
        prompt = f"""
You are an expert technical summarizer. Analyze the following StackOverflow question and provide a comprehensive summary.

Question Title: {title}
{tag_info}

Content:
{content}

Please provide a JSON response with the following structure:
{{
    "title": "The question title",
    "summary": "A clear, concise summary of the main problem and solution (2-3 sentences)",
    "key_points": [
        "Key point 1 about the solution",
        "Key point 2 about important considerations",
        "Key point 3 about best practices"
    ],
    "code_samples": [
        "Relevant code snippet 1",
        "Relevant code snippet 2"
    ],
    "tags": ["tag1", "tag2", "tag3"]
}}

Focus on:
1. The core problem being solved
2. The most effective solution(s)
3. Important technical details
4. Code examples that demonstrate the solution
5. Best practices and considerations

Return only valid JSON without any additional text.
"""
        return prompt
    
    def _create_chat_prompt(self, message: str, context: str | None = None) -> str:
        """
        Create a prompt for follow-up questions
        """
        context_info = f"\nPrevious context: {context}" if context else ""
        
        prompt = f"""
You are a helpful technical assistant. Answer the following follow-up question based on the previous conversation about a StackOverflow question.

{context_info}

User question: {message}

Provide a clear, helpful response that:
1. Directly addresses the user's question
2. Builds on the previous context if available
3. Includes relevant technical details
4. Is concise but informative

Response:
"""
        return prompt
    
    async def _make_openai_request(self, prompt: str) -> str:
        """
        Make a request to OpenAI API
        """
        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": "You are a helpful technical assistant."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=1000,
                temperature=0.3
            )
            
            return response.choices[0].message.content or ""
            
        except Exception as e:
            raise Exception(f"OpenAI API request failed: {str(e)}")
    
    def _parse_summary_response(self, response: str) -> SummaryData:
        """
        Parse the OpenAI response into SummaryData
        """
        try:
            # Clean the response and extract JSON
            response = response.strip()
            if response.startswith("```json"):
                response = response[7:]
            if response.endswith("```"):
                response = response[:-3]
            
            response = response.strip()
            
            # Parse JSON
            data = json.loads(response)
            
            return SummaryData(
                title=data.get("title", ""),
                summary=data.get("summary", ""),
                key_points=data.get("key_points", []),
                code_samples=data.get("code_samples", []),
                tags=data.get("tags", [])
            )
            
        except json.JSONDecodeError as e:
            raise Exception(f"Failed to parse OpenAI response as JSON: {str(e)}")
        except Exception as e:
            raise Exception(f"Error parsing summary response: {str(e)}") 