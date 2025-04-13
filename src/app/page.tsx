"use client";

import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {useState} from "react";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {CheckCircle, Phone} from "lucide-react";

export default function Home() {
  const defaultCountryCode = "+91";
  const [phoneNumber, setPhoneNumber] = useState(defaultCountryCode);
  const [isRequestingDeletion, setIsRequestingDeletion] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (phoneNumber.length !== 13) {
      setError("Please enter a valid 10-digit phone number after the country code.");
      return;
    }

    setIsRequestingDeletion(true);
    setError(null);
    setSuccess(false);

    try {
      // Simulate account deletion process (replace with actual deletion logic)
      setTimeout(() => {
        setSuccess(true);
      }, 1500);
    } catch (e: any) {
      setError("Failed to request deletion. Please try again.");
    } finally {
      setIsRequestingDeletion(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <h1 className="text-2xl font-semibold mb-4 text-foreground">Billion Tests</h1>
      <p className="text-muted-foreground mb-4">
        Enter your phone number to request account deletion.
      </p>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="relative">
          <Phone className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground"/>
          <Input
            type="tel"
            placeholder="Phone Number"
            value={phoneNumber}
            readOnly
            className="pl-10"
            disabled={isRequestingDeletion}
          />
        </div>
        <Button
          type="submit"
          className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90"
          disabled={isRequestingDeletion}
        >
          {isRequestingDeletion ? "Requesting Deletion..." : "Request Deletion"}
        </Button>
      </form>

      {success && (
        <Alert className="mt-4 w-full max-w-md">
          <CheckCircle className="h-4 w-4"/>
          <AlertTitle>Deletion Requested</AlertTitle>
          <AlertDescription>
            Your account deletion has been successfully requested. Please allow 3-5 business days for
            the process to complete. If you have any issues, contact{" "}
            <a href="mailto:support@example.com" className="underline">
              support@example.com
            </a>
            .
          </AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert variant="destructive" className="mt-4 w-full max-w-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="none"
            className="h-4 w-4"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L7.268 5c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
          </svg>
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
