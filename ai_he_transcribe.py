# Requirements:
# To use with CUDA (nvidia gpu):
#   Install CUDA (https://developer.nvidia.com/cuda-download)
#   Install pytorch with CUDA (https://pytorch.org/get-started/locally/)
#   Install faster_whisper (`pip install faster-whisper`; https://github.com/SYSTRAN/faster-whisper)
# To use:
#   Change the file_to_transcribe to your file
#   The model here is the whisper version of ivrit-ai that is supposedly fit for hebrew (https://huggingface.co/ivrit-ai/whisper-large-v3-ct2)
#
#
# This script loads the model and runs it through the video/audio file to create an SRT subtitles file.
# Adapted from https://github.com/SYSTRAN/faster-whisper/tree/master?tab=readme-ov-file#usage

from faster_whisper import WhisperModel
from datetime import timedelta

model_size = "ivrit-ai/whisper-large-v3-ct2"  

file_to_transcribe = "your_file.mp4"  # can be either video (at least mp4) or audio file
output_file = "subtitles.srt"


model = WhisperModel(model_size, device="cuda"))
segments, info = model.transcribe(file_to_transcribe, beam_size=5)


print("Detected language '%s' with probability %f" % (info.language, info.language_probability))


def fmtdeltatime(dtime, fmt):
    d = {}
    d["H"], rem = divmod(dtime.seconds, 3600)
    d["M"], d["S"] = divmod(rem, 60)
    d["f"] = f"{dtime.microseconds // 1000:03d}"
    return fmt.format(**d)

fmt = "{H:02}:{M:02}:{S:02},{f}"


with open(output_file, "wb") as f:
    for segment in segments:
        start = timedelta(seconds=segment.start)
        end = timedelta(seconds=segment.end)
        f.write(b"%d\n" % segment.id)
        f.write(b"%s --> %s\n" % (fmtdeltatime(start, fmt).encode("utf-8"), fmtdeltatime(end, fmt).encode("utf-8")))
        f.write(b"%s\n" % segment.text.encode("utf-8"))
        f.write(b"\n")
