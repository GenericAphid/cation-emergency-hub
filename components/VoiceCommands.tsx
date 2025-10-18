import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mic, MicOff, Phone } from "lucide-react";
import { useVoiceRecognition } from "@/hooks/useVoiceRecognition";

interface VoiceCommandsProps {
  isListening: boolean;
  onToggleListening: (listening: boolean) => void;
}

export function VoiceCommands({ isListening, onToggleListening }: VoiceCommandsProps) {
  const { transcript, isSupported, startListening, stopListening } = useVoiceRecognition();
  const [recognizedCommand, setRecognizedCommand] = useState<string | null>(null);

  const emergencyCommands = {
    "call the police": { number: "10111", service: "Police" },
    "call police": { number: "10111", service: "Police" },
    "call the ambulance": { number: "10177", service: "Ambulance" },
    "call ambulance": { number: "10177", service: "Ambulance" },
    "call the fire station": { number: "10177", service: "Fire Department" },
    "call fire station": { number: "10177", service: "Fire Department" },
    "emergency": { number: "112", service: "Emergency Services" }
  };

  const handleToggleListening = () => {
    if (isListening) {
      stopListening();
      onToggleListening(false);
    } else {
      startListening();
      onToggleListening(true);
    }
  };

  const executeCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    
    for (const [phrase, contact] of Object.entries(emergencyCommands)) {
      if (lowerCommand.includes(phrase)) {
        setRecognizedCommand(contact.service);
        // In a real app, this would make the actual call
        alert(`Calling ${contact.service} at ${contact.number}`);
        return;
      }
    }
  };

  useEffect(() => {
    if (transcript) {
      executeCommand(transcript);
    }
  }, [transcript]);

  if (!isSupported) {
    return (
      <div className="text-center p-4 bg-gray-50 rounded">
        <p className="text-sm text-muted-foreground">
          Voice commands not supported in your browser
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-center gap-3">
        <Button
          size="lg"
          variant={isListening ? "destructive" : "default"}
          onClick={handleToggleListening}
          className="w-20 h-20 rounded-full"
        >
          {isListening ? <MicOff size={24} /> : <Mic size={24} />}
        </Button>
      </div>

      {isListening && (
        <div className="text-center">
          <Badge variant="secondary" className="animate-pulse">
            Listening...
          </Badge>
          <p className="text-xs text-muted-foreground mt-1">
            Say a command like "call the police"
          </p>
        </div>
      )}

      {transcript && (
        <div className="text-center p-2 bg-blue-50 rounded">
          <p className="text-sm">
            <span className="font-medium">Heard:</span> "{transcript}"
          </p>
        </div>
      )}

      {recognizedCommand && (
        <div className="text-center p-2 bg-green-50 rounded">
          <p className="text-sm text-green-800">
            <Phone size={16} className="inline mr-1" />
            Calling {recognizedCommand}
          </p>
        </div>
      )}
    </div>
  );
}