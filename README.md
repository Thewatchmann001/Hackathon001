# TrustBridge SL platform
Job Matching Platform (Frontend + ML Model)

This project is part of a Hackathon solution that matches job seekers to relevant job listings using a sentence-transformer ML model, combined with a Next.js frontend.

🚀 Project Overview

The system consists of:

Frontend (Next.js) – UI for job search, categories, filters, and job listings.

Job Matching Model – A fine-tuned sentence-transformer that converts job descriptions & user skills into embeddings for similarity matching.

Backend (Handled by team) – Authentication, job storage, API endpoints, admin dashboard, etc.

Your task in this project includes:

Building the user interface.

Training the sentence-transformer model.

Saving & exporting embeddings for integration by the backend team.

📁 Repository Structure
Hackathon001/
│
├── frontend/                  # Next.js application (UI)
│
├── model/                     # ML training notebooks & saved files
│   ├── training_notebook.ipynb
│   ├── config.json            # Model configuration
│   ├── pytorch_model.bin      # Learned model weights
│   ├── tokenizer.json         # Tokenizer used by the model
│   ├── job_embeddings.pt      # Saved job embeddings (torch tensor)
│
└── README.md
