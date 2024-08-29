# Wardley Map Generator

## Overview

The Wardley Map Generator is a web application that allows users to generate Wardley Maps based on domain descriptions provided by OpenAI's GPT models. Users can input their OpenAI API key, select a model, and enter a domain to receive a structured description that can be visualized as a Wardley Map.

## Features

- Input for OpenAI API key
- Selection of GPT model (e.g., gpt-3.5-turbo, gpt-4)
- Domain input for generating descriptions
- Display of generated text with the ability to edit
- Visualization of the Wardley Map based on generated data
- Loading indicator during API calls
- Option to map data after reviewing generated text

## Technologies Used

- React
- Axios (for API calls)
- React Draggable (for movable nodes in the Wardley Map)
- OpenAI API

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (Node package manager)

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd wardley-map-generator
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your OpenAI API key:

   ```plaintext
   REACT_APP_OPENAI_API_KEY=your_api_key_here
   ```

### Running the Application

To start the development server, run:

