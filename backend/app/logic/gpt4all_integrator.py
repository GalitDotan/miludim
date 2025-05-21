from dotenv import load_dotenv
from gpt4all import GPT4All

# Load environment variables from .env file
load_dotenv()


class GPTAllIntegrator:
    """
    A handler for communicating with the OpenAI API, including methods
    to summarize lecture subtitles synchronously.
    """

    def __init__(self):
        """
        Initializes the handler by instantiating a new OpenAI client.
        """
        self.model = GPT4All("Meta-Llama-3-8B-Instruct.Q4_0.gguf")  # downloads / loads a 4.66GB LLM

    @staticmethod
    def _load_subtitles(file_path: str) -> str:
        """
        Loads and parses subtitles from an .srt file, returning the transcript text.
        """
        with open(file_path, 'r', encoding='utf-8') as f:
            return f.read()

    def summarize_text(self, file_path: str, summary_tokens: int = 100) -> str:
        """
        Loads subtitles from a file and returns a summary.
        """
        transcript = self._load_subtitles(file_path)

        with self.model.chat_session():
            return self.model.generate(
                fr"This is the transcript of a university lecture I was in. Summarize it for me: {transcript}",
                max_tokens=summary_tokens)


if __name__ == '__main__':
    # Example usage with synchronous calls:
    handler = GPTAllIntegrator()
    print("1")
    summary = handler.summarize_text(
        r"C:\Users\galam\OneDrive\Documents\3. Programming\miludim\backend\resources\Calculus2_09.txt",
    )
    print("2")
    print(summary)
