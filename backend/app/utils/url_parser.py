import re
from urllib.parse import urlparse
from typing import Optional, Tuple


def is_stackoverflow_url(url: str) -> bool:
    """
    Check if the URL is a valid StackOverflow question URL
    """
    try:
        parsed = urlparse(url)
        return (
            parsed.netloc in ['stackoverflow.com', 'www.stackoverflow.com'] and
            '/questions/' in parsed.path
        )
    except:
        return False


def extract_question_id(url: str) -> Optional[str]:
    """
    Extract the question ID from a StackOverflow URL
    """
    try:
        parsed = urlparse(url)
        path_parts = parsed.path.split('/')
        
        for i, part in enumerate(path_parts):
            if part == 'questions' and i + 1 < len(path_parts):
                # The next part should be the question ID
                question_id = path_parts[i + 1]
                if question_id.isdigit():
                    return question_id
        
        return None
    except:
        return None


def clean_url(url: str) -> str:
    """
    Clean and normalize a URL
    """
    # Remove any trailing slashes
    url = url.rstrip('/')
    
    # Ensure it starts with http/https
    if not url.startswith(('http://', 'https://')):
        url = 'https://' + url
    
    return url


def validate_input(url: Optional[str] = None, question: Optional[str] = None) -> Tuple[bool, str]:
    """
    Validate input parameters
    """
    if not url and not question:
        return False, "Either URL or question text must be provided"
    
    if url:
        if not is_stackoverflow_url(url):
            return False, "Please provide a valid StackOverflow question URL"
    
    if question and len(question.strip()) < 10:
        return False, "Question text must be at least 10 characters long"
    
    return True, ""


def extract_domain(url: str) -> str:
    """
    Extract domain from URL
    """
    try:
        parsed = urlparse(url)
        return parsed.netloc
    except:
        return ""


def is_valid_url(url: str) -> bool:
    """
    Basic URL validation
    """
    try:
        result = urlparse(url)
        return all([result.scheme, result.netloc])
    except:
        return False 