import structlog
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from typing import Optional

from flare_ai_consensus.router import AsyncOpenRouterProvider, ChatRequest
from flare_ai_consensus.settings import ConsensusConfig, Message
from flare_ai_consensus.utils import parse_chat_response

logger = structlog.get_logger(__name__)

# Add back the router variable that is needed for imports
router = APIRouter()


class ChatMessage(BaseModel):
    """
    Pydantic model for chat message validation.

    Attributes:
        system_message (str): The system message/prompt to guide the model
        user_message (str): The user's message content, must not be empty
    """

    system_message: str = Field(..., min_length=1)
    user_message: str = Field(..., min_length=1)


class ResearchPaperRequest(BaseModel):
    """
    Pydantic model for research paper generation requests.

    Attributes:
        topic (str): The debate topic
        perspectives (list): List of debate perspectives from different stances
        system_message (Optional[str]): Custom system message for paper generation
    """
    
    topic: str = Field(..., min_length=1)
    perspectives: list[dict[str, str]] = Field(..., min_items=1)
    system_message: Optional[str] = None


class ChatRouter:
    """
    A simple chat router that processes incoming messages using the LLM.
    """

    def __init__(
        self,
        router: APIRouter,
        provider: AsyncOpenRouterProvider,
        consensus_config: Optional[ConsensusConfig] = None,
    ) -> None:
        """
        Initialize the ChatRouter.

        Args:
            router (APIRouter): FastAPI router to attach endpoints.
            provider: instance of an async OpenRouter client.
            consensus_config: config for running the consensus algorithm.
        """
        self._router = router
        self.provider = provider
        self.consensus_config = consensus_config if consensus_config else None
        self.logger = logger.bind(router="chat")
        self._setup_routes()

    def _setup_routes(self) -> None:
        """
        Set up FastAPI routes for the chat endpoint.
        """

        @self._router.post("/")
        async def chat(message: ChatMessage) -> dict[str, str]:  # pyright: ignore [reportUnusedFunction]
            """
            Handle chat messages and return a response.

            Args:
                message (ChatMessage): Validated chat message from the client

            Returns:
                dict[str, str]: Response message content
            """
            self.logger.info(f"Received message: {message.user_message[:50]}...")
            
            try:
                # Create a ChatRequest payload
                payload: ChatRequest = {
                    "model": "openai/gpt-3.5-turbo",
                    "messages": [
                        {"role": "system", "content": message.system_message},
                        {"role": "user", "content": message.user_message}
                    ],
                    "max_tokens": 2000,
                    "temperature": 0.7,
                }
                
                # Send the request
                response = await self.provider.send_chat_completion(payload)
                
                # Parse the response
                text = parse_chat_response(response)
                
                self.logger.info(f"Response: {text[:50]}...")
                return {"response": text}
            except Exception as e:
                self.logger.error(f"Error processing message: {e}")
                return {"response": f"Error processing message: {str(e)}"}
        
        @self._router.post("/research_paper")
        async def generate_research_paper(request: ResearchPaperRequest) -> dict[str, str]:  # pyright: ignore [reportUnusedFunction]
            """
            Generate a comprehensive research paper from debate perspectives.

            Args:
                request (ResearchPaperRequest): Contains the debate topic and all perspectives

            Returns:
                dict[str, str]: Generated research paper content with structured sections
            """
            self.logger.info(f"Generating research paper for topic: {request.topic}")
            
            # Construct the system message if not provided
            system_message = request.system_message or (
                f"Generate a comprehensive research paper on the topic: \"{request.topic}\". "
                f"The paper should synthesize multiple perspectives in an academic format, with "
                f"an abstract, introduction, analysis of different viewpoints, discussion, "
                f"conclusion, and references. Maintain an objective, scholarly tone throughout."
            )
            
            # Construct the user message with all perspectives
            perspectives_text = ""
            for i, perspective in enumerate(request.perspectives):
                stance = perspective.get("stance", f"Perspective {i+1}")
                content = perspective.get("content", "")
                perspectives_text += f"\n{stance}:\n{content}\n"
            
            user_message = (
                f"Please generate a research paper for the topic \"{request.topic}\" "
                f"based on these debate perspectives:\n{perspectives_text}"
            )
            
            try:
                # Create a ChatRequest payload
                payload: ChatRequest = {
                    "model": "openai/gpt-3.5-turbo-16k",  # Using a model with more context for research papers
                    "messages": [
                        {"role": "system", "content": system_message},
                        {"role": "user", "content": user_message}
                    ],
                    "max_tokens": 4000,  # Longer for research papers
                    "temperature": 0.5,   # More focused for academic content
                }
                
                # Send the request
                response = await self.provider.send_chat_completion(payload)
                
                # Parse the response
                text = parse_chat_response(response)
                
                self.logger.info(f"Research paper generated successfully (length: {len(text)} chars)")
                return {"response": text}
            except Exception as e:
                self.logger.error(f"Error generating research paper: {e}")
                return {"response": f"Error generating research paper: {str(e)}"}

    @property
    def router(self) -> APIRouter:
        """
        Get the FastAPI router with configured routes.

        Returns:
            APIRouter: Configured FastAPI router
        """
        return self._router
