## ✨ Features

### 🔹 Tier 1: Basic Chat Interface

- **Real-time Chat**: Scrollable chat window with user and bot messages
- **Message Input**: Textarea input field with send button and keyboard shortcuts
- **Mock AI Responses**: Simulated AI responses with realistic delays
- **Message History**: Persistent chat history during session

### 🔹 Tier 2: Universal Prompt Settings

- **Settings Panel**: Clean dialog interface for prompt management
- **Universal Prompt**: Customizable prompt prepended to all messages
- **Prompt Indicator**: Visual badge showing when a prompt is active
- **Clear Functionality**: Easy prompt reset with confirmation

### 🔹 Tier 3: Enhanced User Experience

- **Loading States**: Skeleton loading animation for AI responses
- **Real-time Typing**: Messages appear instantly with smooth animations
- **Auto-scroll**: Chat automatically scrolls to newest messages
- **Keyboard Shortcuts**: Enter to send, Shift+Enter for new lines
- **Auto-resize**: Input field grows/shrinks based on content

### 🔹 Tier 4: Persistence & Responsiveness

- **LocalStorage**: Universal prompt auto-saved and persisted
- **Mobile Responsive**: Optimized for all screen sizes
- **Clean Architecture**: Modular component structure
- **TypeScript**: Full type safety throughout the application

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed on your machine
- Package manager: \`pnpm\`, \`npm\`, or \`yarn\`

### Installation

1. **Clone or download the project files**

2. **Install dependencies**
   \`\`\`bash

   # Using pnpm (recommended)

   pnpm install

   # Using npm

   npm install

   # Using yarn

   yarn install
   \`\`\`

3. **Run the development server**
   \`\`\`bash

   # Using pnpm

   pnpm dev

   # Using npm

   npm run dev

   # Using yarn

   yarn dev
   \`\`\`

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

\`\`\`
├── app/
│ ├── globals.css # Global styles and Tailwind imports
│ ├── layout.tsx # Root layout with theme provider
│ └── page.tsx # Main chat page component
├── components/
│ ├── ui/ # Shadcn UI components
│ │ ├── button.tsx
│ │ ├── card.tsx
│ │ ├── dialog.tsx
│ │ ├── scroll-area.tsx
│ │ └── ...
│ ├── chat-window.tsx # Main chat interface
│ ├── message-bubble.tsx # Individual message component
│ ├── loading-message.tsx # Loading state component
│ └── prompt-settings.tsx # Settings dialog component
├── lib/
│ └── utils.ts # Utility functions
└── README.md
\`\`\`

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **UI Components**: Shadcn UI
- **Icons**: Lucide React
- **State Management**: React useState/useEffect
- **Storage**: Browser localStorage

## 🎨 Design Features

- **Clean Interface**: Minimalist design inspired by Vercel v0
- **Responsive Layout**: Works seamlessly on desktop, tablet, and mobile
- **Dark/Light Theme**: Supports system theme preferences
- **Smooth Animations**: Subtle transitions and loading states
- **Accessible**: Built with accessibility best practices

## 🔧 Customization

### Adding Real AI Integration

Replace the \`simulateAIResponse\` function in \`app/page.tsx\` with your preferred AI service:

\`\`\`typescript
// Example with OpenAI
import { openai } from '@ai-sdk/openai'
import { generateText } from 'ai'

async function getAIResponse(message: string, prompt: string) {
const { text } = await generateText({
model: openai('gpt-4'),
prompt: prompt ? \`\${prompt}\\n\\nUser: \${message}\` : message,
})
return text
}
\`\`\`

### Styling Customization

- Modify \`tailwind.config.ts\` for custom colors and themes
- Update Shadcn UI components in \`components/ui/\` for custom styling
- Adjust spacing and layout in individual components

## 📱 Usage

1. **Start Chatting**: Type a message and press Enter or click Send
2. **Set Universal Prompt**: Click the settings icon to add a universal prompt
3. **Multiline Messages**: Use Shift+Enter to add line breaks
4. **Clear Prompt**: Use the "Clear Prompt" button in settings to reset

## 🤝 Contributing

Feel free to submit issues, feature requests, or pull requests to improve this chatbot interface.

## 📄 License

This project is open source and available under the MIT License.
\`\`\`
