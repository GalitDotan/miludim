import os
from typing import List

from dotenv import load_dotenv
from openai import OpenAI

# Load environment variables from .env file
load_dotenv()

class OpenAIIntegrator:
    """
    A handler for communicating with the OpenAI API, including methods
    to summarize lecture subtitles synchronously.
    """

    def __init__(self, model: str = "gpt-3.5-turbo"):
        """
        Initializes the handler by instantiating a new OpenAI client.
        """
        self.client = OpenAI()
        self.model = model

    @staticmethod
    def load_subtitles(file_path: str) -> str:
        """
        Loads and parses subtitles from an .srt file, returning the transcript text.
        """
        with open(file_path, 'r', encoding='utf-8') as f:
            return f.read()

    def summarize_text(self, text: str, max_tokens: int = 150, temperature: float = 0.5) -> str:
        """
        Sends the provided text to the OpenAI API for summarization.
        """
        messages = [
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": f"Summarize the following lecture transcript in a concise manner:\n\n{text}"}
        ]
        response = self.client.chat.completions.create(
            model=self.model,
            messages=messages,
            max_tokens=max_tokens,
            temperature=temperature
        )
        return response.choices[0].message.content.strip()

    def summarize_subtitles(self, file_path: str, summary_tokens: int = 50, temperature: float = 0.5) -> str:
        """
        Loads subtitles from a file and returns a summary.
        """
        transcript = self.load_subtitles(file_path)
        return self.summarize_text(
            text=transcript,
            max_tokens=summary_tokens,
            temperature=temperature
        )

    def call_chat(self, messages: List[dict], **kwargs) -> str:
        """
        Generic method to send a chat completion request with custom messages and parameters.
        """
        response = self.client.chat.completions.create(
            model=self.model,
            messages=messages,
            **kwargs
        )
        return response.choices[0].message.content.strip()

if __name__ == '__main__':
    # Example usage with synchronous calls:
    handler = OpenAIIntegrator()
    summary = handler.summarize_subtitles(
        r"C:\Users\galam\OneDrive\Documents\3. Programming\miludim\backend\resources\Calculus2_09.txt",
    )
    print(summary)
