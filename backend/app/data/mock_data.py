mock_courses = {
    "e71fff0a-b2a4-4616-8580-068a286d933b": {
        "name": "Economy",
        "description": "Description about the Economy course",
        "lectures": [
            "024a4eb9-94f5-47da-b699-da4d2b830292",
            "9d1ac717-c2f1-4f3a-ba8f-2c7f36e97f0e",
        ],
    },
    "8f3b4ffe-3b05-4fdf-8168-254294b96f44": {
        "name": "Computer Science",
        "description": "Description about the Computer Science course",
        "lectures": [
            "d09f4363-1330-40f0-a52b-fad66d4cfa61",
        ],
    },
}

mock_lectures = {
    "024a4eb9-94f5-47da-b699-da4d2b830292": {
        "name": "Lecture 1 - Economy",
        "description": "Money or something, i dont know",
        "users": [
            "42940327-970d-4d7b-b154-12f54f941a6b",
            "4c65cb3c-fc52-4aee-8847-fbd231d6fe26",
        ],
    },
    "d09f4363-1330-40f0-a52b-fad66d4cfa61": {
        "name": "Lecture 1 - Computer Science",
        "description": "A very funny course",
        "users": [
            "9a8db790-8690-4e49-8c84-c70ac399b423",
        ],
    },
    "9d1ac717-c2f1-4f3a-ba8f-2c7f36e97f0e": {
        "name": "Lecture 2 - Economy",
        "description": "More money",
        "users": [
            "147df858-8116-4de6-81cb-9740bb32a62b",
            "aac32dfa-d5f5-4e32-8683-01a8659e4f63",
        ],
    },
}

mock_videos = {
    "aac32dfa-d5f5-4e32-8683-01a8659e4f63": {
        "name": "Part 4",
        "description": "More money 4",
        "filename": "mock/3945008-uhd_3840_2160_30fps.mp4",
    },
    "42940327-970d-4d7b-b154-12f54f941a6b": {
        "name": "Part 1",
        "description": "More money 1",
        "filename": "mock/1797247-uhd_3840_2160_24fps.mp4",
    },
    "4c65cb3c-fc52-4aee-8847-fbd231d6fe26": {
        "name": "Part 2",
        "description": "More money 2",
        "filename": "mock/1797251-uhd_3840_2160_24fps.mp4",
    },
    "9a8db790-8690-4e49-8c84-c70ac399b423": {
        "name": "CS 101",
        "description": "More money 3",
        "filename": "mock/3141210-uhd_3840_2160_25fps.mp4",
    },
    "147df858-8116-4de6-81cb-9740bb32a62b": {
        "name": "Part 3",
        "description": "More money",
        "filename": "mock/6942709-hd_1920_1080_25fps.mp4",
    },
}

mock_users = {
    "4c65cb3c-dc52-4aee-8847-fbd231d6fe26": {
        "name": "Lia",
        "courses": {
            "e71fff0a-b2a4-4616-8580-068a286d933b": {
                "lectures": {
                    "024a4eb9-94f5-47da-b699-da4d2b830292": {
                        "videos": {
                            "42940327-970d-4d7b-b154-12f54f941a6b": {
                                "stopped_time": 0,
                                "watched": True,
                            },
                            "4c65cb3c-fc52-4aee-8847-fbd231d6fe26": {
                                "stopped_time": 5,
                                "watched": False,
                            },
                        }
                    }
                }
            }
        }
    }
}
