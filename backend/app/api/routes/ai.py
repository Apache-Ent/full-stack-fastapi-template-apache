from typing import Optional
from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from openai import OpenAI, AsyncOpenAI
from app.core.config import settings
import os
from app.models import ChatRequest, ChatResponse

router = APIRouter(prefix="/chat", tags=["chat"])


@router.post("/chat", response_model=ChatResponse)
async def chat_with_ai(request: ChatRequest):
    """
    Send a message to OpenAI's chat model and get a response.
    """
    try:
        client = AsyncOpenAI(
            api_key=settings.OPENAI_API_KEY
        )
        
        response = await client.chat.completions.create(
            model=settings.OPENAI_MODEL,
            messages=[
                {"role": "user", "content": request.message}
            ],
            temperature=settings.OPENAI_TEMPERATURE,
            max_tokens=settings.OPENAI_MAX_TOKENS
        )
        
        return ChatResponse(
            response=response.choices[0].message.content
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error communicating with OpenAI: {str(e)}"
        ) 