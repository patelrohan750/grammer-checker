"use client";
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useState, ChangeEvent,MouseEvent } from "react";


const Main = () => {
const [text,setText] = useState('');
const [output,setOutput] = useState('');
const handleTextChange = (e:ChangeEvent<HTMLTextAreaElement>) =>{
    setText(e.target.value);
}
const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) =>{
    e.preventDefault();
    try {
        const response = await fetch('api/openai', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ text })
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setOutput(data.output); // Assuming the API response contains an 'output' field
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
}
  return (
    <div className="container h-full py-6">
      <div className="grid h-full items-stretch gap-6">
        <div className="md:order-1">
          <div className="flex flex-col space-y-4">
            <div className="grid h-full grid-rows-2 gap-6 lg:grid-cols-2 lg:grid-rows-1">
              <Textarea
                className="min-h-[50vh]"
                placeholder="Enter your text."
                value={text}
                onChange={handleTextChange}
              />
              <div className="relative rounded-md border bg-muted">
                <Badge className="absolute right-3 top-3">
                Output
                </Badge>
                {output}
              </div>
            </div>
            <div className="flex items-center space-x-2">
                <Button onClick={handleSubmit}>Submit</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
