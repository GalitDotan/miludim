mock_courses = {
    "e71fff0a-b2a4-4616-8580-068a286d933b": {
        "name": "Calculus 2",
        "description": "The sequel to an all-time classic",
        "lectures": [
            "024a4eb9-94f5-47da-b699-da4d2b830292",
            "9d1ac717-c2f1-4f3a-ba8f-2c7f36e97f0e",
            "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "9b1deb4d-3b7d-4f0d-a7f1-f6b5480d7f5b"
        ],
    },
    "8f3b4ffe-3b05-4fdf-8168-254294b96f44": {
        "name": "Intro to Computer Science",
        "description": "Computer Science basics - Python, Algorithms, Data Structures",
        "lectures": [
            "d09f4363-1330-40f0-a52b-fad66d4cfa61",
        ],
    },
    "f47ac10b-58cc-4372-a567-0e02b2c3d479": {
        "name": "Economics",
        "description": "Everything about money",
        "lectures": [
            "f5e3d7a6-2a13-4d1f-8c7e-72d26e4f1bda",
        ],
    }
}

mock_lectures = {
    "024a4eb9-94f5-47da-b699-da4d2b830292": {
        "name": "Lecture 1 - Intro",
        "description": "Rehearsal of Calculus 1; Introduction to Convex Functions",
        "users": [
            "42940327-970d-4d7b-b154-12f54f941a6b",
            "4c65cb3c-fc52-4aee-8847-fbd231d6fe26",
        ],
    },
    "9d1ac717-c2f1-4f3a-ba8f-2c7f36e97f0e": {
        "name": "Lecture 2 - Limits",
        "description": "Computation of Limits, Infinite Series",
        "users": [
            "024a4eb9-94f5-47da-b699-da4d2b830292",
            "42940327-970d-4d7b-b154-12f54f941a6b",
            "4c65cb3c-fc52-4aee-8847-fbd231d6fe26",
            "9a8db790-8690-4e49-8c84-c70ac399b423",
            "147df858-8116-4de6-81cb-9740bb32a62b"
            
        ],
    },
    "3fa85f64-5717-4562-b3fc-2c963f66afa6": {
        "name": "Lecture 3 - Integrals",
        "description": "Definite Integrals, Riemann Sum",
        "users": [],
    },
    "9b1deb4d-3b7d-4f0d-a7f1-f6b5480d7f5b": {
        "name": "Lecture 4 - Fourier",
        "description": "Complex Numbers, Fourier Series",
        "users": [],
    },
    
    "f5e3d7a6-2a13-4d1f-8c7e-72d26e4f1bda": {
        "name": "Lecture 1 - Intro to Economy",
        "description": "Positive and Normative Economics",
        "users": [],
    },
    "d09f4363-1330-40f0-a52b-fad66d4cfa61": {
        "name": "Lecture 1 - Python",
        "description": "Python Functions, Classes, Errors",
        "users": [],
    }
}

mock_videos = {
    "024a4eb9-94f5-47da-b699-da4d2b830292": {
        "name": "Functions Mappings",
        "description": "Introduction to functions as mappings",
        "filename": "mock/3945008-uhd_3840_2160_30fps.mp4",
    },
    "42940327-970d-4d7b-b154-12f54f941a6b": {
        "name": "Scalar Functions",
        "description": "Graph of scalar functions r²→r",
        "filename": "mock/1797247-uhd_3840_2160_24fps.mp4",
    },
    "4c65cb3c-fc52-4aee-8847-fbd231d6fe26": {
        "name": "Level Surfaces",
        "description": "Definition of level surfaces, quadratic function level surfaces",
        "filename": "mock/1797251-uhd_3840_2160_24fps.mp4",
    },
    "9a8db790-8690-4e49-8c84-c70ac399b423": {
        "name": "Sequences and Limits",
        "description": "Transition to sequences and limits, recap of Calculus 1",
        "filename": "mock/3141210-uhd_3840_2160_25fps.mp4",
    },
    "147df858-8116-4de6-81cb-9740bb32a62b": {
        "name": "Componentwise Convergence Proof",
        "description": "Proof of componentwise convergence in ℝ²",
        "filename": "mock/6942709-hd_1920_1080_25fps.mp4",
    },
}

mock_users = {
    "4c65cb3c-dc52-4aee-8847-fbd231d6fe26": {
        "name": "Lia",
        "courses": {
            "e71fff0a-b2a4-4616-8580-068a286d933b": {
                "lectures": {
                    "9d1ac717-c2f1-4f3a-ba8f-2c7f36e97f0e": {
                        "videos": {
                            "42940327-970d-4d7b-b154-12f54f941a6b": {
                                "stopped_time": 0,
                                "watched": True,
                            },
                            "4c65cb3c-fc52-4aee-8847-fbd231d6fe26": {
                                "stopped_time": 5,
                                "watched": True,
                            },
                        }
                    }
                }
            }
        }
    }
}
