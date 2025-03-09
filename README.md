This project is licensed under the MIT License - see the LICENSE file for details.
# Marckarimi

[![Next.js](https://img.shields.io/badge/Next.js-15.2.1-black?style=flat&logo=next.js&logoColor=white)](https://nextjs.org)
[![Flare](https://img.shields.io/badge/flare-network-e62058.svg?logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNCIgaGVpZ2h0PSIzNCI+PHBhdGggZD0iTTkuNC0uMWEzMjAuMzUgMzIwLjM1IDAgMCAwIDIuOTkuMDJoMi4yOGExMTA2LjAxIDExMDYuMDEgMCAwIDEgOS4yMy4wNGMzLjM3IDAgNi43My4wMiAxMC4xLjA0di44N2wuMDEuNDljLS4wNSAyLTEuNDMgMy45LTIuOCA1LjI1YTkuNDMgOS40MyAwIDAgMS02IDIuMDdIMjAuOTJsLTIuMjItLjAxYTQxNjEuNTcgNDE2MS41NyAwIDAgMS04LjkyIDBMMCA4LjY0YTIzNy4zIDIzNy4zIDAgMCAxLS4wMS0xLjUxQy4wMyA1LjI2IDEuMTkgMy41NiAyLjQgMi4yIDQuNDcuMzcgNi43LS4xMiA5LjQxLS4wOXoiIGZpbGw9IiNFNTIwNTgiLz48cGF0aCBkPSJNNy42NSAxMi42NUg5LjJhNzU5LjQ4IDc1OS40OCAwIDAgMSA2LjM3LjAxaDMuMzdsNi42MS4wMWE4LjU0IDguNTQgMCAwIDEtMi40MSA2LjI0Yy0yLjY5IDIuNDktNS42NCAyLjUzLTkuMSAyLjVhNzA3LjQyIDcwNy40MiAwIDAgMC00LjQtLjAzbC0zLjI2LS4wMmMtMi4xMyAwLTQuMjUtLjAyLTYuMzgtLjAzdi0uOTdsLS4wMS0uNTVjLjA1LTIuMSAxLjQyLTMuNzcgMi44Ni01LjE2YTcuNTYgNy41NiAwIDAgMSA0LjgtMnoiIGZpbGw9IiNFNjIwNTciLz48cGF0aCBkPSJNNi4zMSAyNS42OGE0Ljk1IDQuOTUgMCAwIDEgMi4yNSAyLjgzYy4yNiAxLjMuMDcgMi41MS0uNiAzLjY1YTQuODQgNC44NCAwIDAgMS0zLjIgMS45MiA0Ljk4IDQuOTggMCAwIDEtMi45NS0uNjhjLS45NC0uODgtMS43Ni0xLjY3LTEuODUtMy0uMDItMS41OS4wNS0yLjUzIDEuMDgtMy43NyAxLjU1LTEuMyAzLjM0LTEuODIgNS4yNy0uOTV6IiBmaWxsPSIjRTUyMDU3Ii8+PC9zdmc+&colorA=FFFFFF)](https://dev.flare.network/)

## Marckarimi - Exploring Multiple Perspectives Through AI-Powered Deep Research

Marckarimi is a cutting-edge platform designed to provide unbiased debates and deep research into complex topics. By leveraging AI consensus learning, Marckarimi presents multiple perspectives on contentious subjects, helping users form informed opinions based on a comprehensive understanding of different viewpoints.

## 📑 Table of Contents

- [Key Features](#-key-features)
- [Vision](#-vision)
- [Technology Stack](#️-technology-stack)
- [How It Works](#-how-it-works)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Development](#development)
- [Flare AI Consensus](#-flare-ai-consensus)
  - [Features](#consensus-features)
  - [Building & Running](#building--running)
  - [Deployment on TEE](#-deploy-on-tee)
  - [Troubleshooting](#-troubleshooting)
- [Future Development](#-future-development)
- [Contributing](#-contributing)
- [Links](#-links)
- [License](#-license)

## 🚀 Key Features

- **Multi-Perspective Analysis**: Explore topics from three distinct viewpoints - For, Against, and Neutral - ensuring a balanced understanding of complex issues.
  
- **AI-Powered Research Papers**: Generate comprehensive research papers that synthesize multiple perspectives into a cohesive academic format.

- **Interactive Debate Interface**: Engage with AI debaters representing different stances and ask follow-up questions to deepen your understanding.

- **Consensus Learning Technology**: Powered by Flare AI Consensus, which combines outputs from multiple AI models to create balanced, nuanced analyses.

## 💡 Vision

In today's polarized information landscape, finding unbiased perspectives on complex topics can be challenging. Marckarimi addresses this problem by:

1. **Reducing Echo Chambers**: Providing multiple viewpoints rather than reinforcing existing beliefs
2. **Promoting Critical Thinking**: Encouraging users to consider arguments from all sides before forming opinions
3. **Democratizing Access to Balanced Information**: Making comprehensive research accessible to everyone

## 🛠️ Technology Stack

- **Frontend**: Next.js 15.2 with TypeScript
- **Backend**: Python-based Flare AI Consensus
- **AI Integration**: Multiple LLM models working together through consensus learning
- **Deployment**: Docker containerization for easy setup and deployment

## 🧩 How It Works

1. **Topic Selection**: Choose from predefined topics or enter your own research question
2. **AI Debate**: Three AI perspectives (For, Against, Neutral) provide insights on the topic
3. **Follow-up Questions**: Ask clarifying questions to deepen your understanding
4. **Research Paper**: Generate a comprehensive paper that synthesizes all perspectives

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Docker (if running the backend locally)

### Development

```bash
# Install dependencies
npm install

# Run the development server
npm run dev

# Open http://localhost:3000 in your browser
```

For complete setup including the backend, please refer to the main [project repository](https://github.com/sanjayamirthraj/flare-consensus).

## 🔥 Flare AI Consensus

Marckarimi is powered by Flare AI Consensus, a powerful implementation of consensus learning for LLMs.

### Consensus Features

- **Consensus Learning Implementation**: A Python implementation of single-node, multi-model Consensus Learning (CL) based on the research from [arXiv:2402.16157](https://arxiv.org/abs/2402.16157)

- **300+ LLM Support**: Leverages OpenRouter to access over 300 models via a unified interface

- **Iterative Feedback Loop**: Employs an aggregation process where multiple LLM outputs are refined over configurable iterations

- **Modular & Configurable**: Easily customize models, conversation prompts, and aggregation parameters through a simple JSON configuration

### Building & Running

Before getting started, ensure you have:

- A **Python 3.12** environment
- [uv](https://docs.astral.sh/uv/getting-started/installation/) installed for dependency management
- [Docker](https://www.docker.com/)
- An [OpenRouter API Key](https://openrouter.ai/settings/keys)

#### Environment Setup

1. **Prepare the Environment File:**
   Rename `.env.example` to `.env` and update the variables accordingly (e.g., your [OpenRouter API Key](https://openrouter.ai/keys))

#### Build using Docker (Recommended)

1. **Build the Docker Image:**

   ```bash
   docker build -t flare-ai-consensus .
   ```

2. **Run the Docker Container:**

   ```bash
   docker run -p 80:80 -it --env-file .env flare-ai-consensus
   ```

3. **Access the Frontend:**
   Open your browser and navigate to [http://localhost:80/docs](http://localhost:80/docs) to interact with the Chat UI.

#### Build Manually

1. **Install Dependencies:**
   Use [uv](https://docs.astral.sh/uv/getting-started/installation/) to install backend dependencies:

   ```bash
   uv sync --all-extras
   ```

2. **Configure CL instance:**
   Configure your CL instance in `src/input.json`, including models, aggregator settings, and iterations.

3. **Start the Backend:**
   The backend runs by default on `0.0.0.0:8080`:

   ```bash
   uv run start-backend
   ```

## 🔒 Deploy on TEE

Deploy on a [Confidential Space](https://cloud.google.com/confidential-computing/confidential-space/docs/confidential-space-overview) using AMD SEV.

### Prerequisites

- **Google Cloud Platform Account**: Access to the [`verifiable-ai-hackathon`](https://console.cloud.google.com/welcome?project=verifiable-ai-hackathon) project
- **OpenRouter API Key**: Your [OpenRouter API key](https://openrouter.ai/settings/keys) in your `.env`
- **gcloud CLI**: Install and authenticate the [gcloud CLI](https://cloud.google.com/sdk/docs/install)

For detailed deployment instructions, refer to the [full documentation](https://github.com/sanjayamirthraj/flare-consensus#-deploy-on-tee).

## 🔧 Troubleshooting

If you encounter issues, follow these steps:

1. **Check Logs:**

   ```bash
   gcloud compute instances get-serial-port-output $INSTANCE_NAME --project=verifiable-ai-hackathon
   ```

2. **Verify API Key(s):**
   Ensure that all API Keys are set correctly.

3. **Check Firewall Settings:**
   Confirm that your instance is publicly accessible on port `80`.

## 📈 Future Development

Ongoing and planned improvements include:

- **Security & TEE Integration**: Ensuring execution within a Trusted Execution Environment (TEE) to maintain confidentiality and integrity

- **Factual Correctness**: Improving accuracy with sources/citations in answers for higher trust

- **Advanced Prompt Engineering**: Implementing techniques like Mixture-of-Agents (MoA), few-shot prompting, and Chain of Thought

- **Dynamic Resource Allocation**: Using dynamically-adjusted parameters based on prompt complexity

- **Semantic Filtering**: Leveraging embeddings and LLM-as-a-Judge approaches for evaluating outputs

- **AI Agent Swarm**: Exploring swarm-type algorithms where tasks are broken down and distributed among specialized agents

## 👥 Contributing

We welcome contributions to both the Marckarimi platform and the underlying Flare AI Consensus technology!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please read our [Contributing Guidelines](CONTRIBUTING.md) for more details.

## 🔗 Links

- [GitHub Repository](https://github.com/sanjayamirthraj/flare-consensus)
- [Backend Documentation](https://github.com/sanjayamirthraj/flare-consensus#readme)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
