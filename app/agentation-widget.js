'use client';

export default function AgentationWidget() {
  if (process.env.NODE_ENV !== 'development') return null;

  const { Agentation } = require('agentation');
  return <Agentation endpoint="http://localhost:4747" />;
}
