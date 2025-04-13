"use client";

import {PhoneValidationResult, validatePhoneNumber} from "@/services/phone-validation";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {useState} from "react";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {CheckCircle, Phone} from "lucide-react";
import {cn} from "@/lib/utils";
import {Icons} from "@/components/icons";

const {ExclamationTriangle} = Icons;

export default function Home() {
  const defaultCountryCode = "+91";
  const [phoneNumber, setPhoneNumber] = useState(defaultCountryCode);
  const [isRequestingDeletion, setIsRequestingDeletion] = useState(false);
  const [deletionResult, setDeletionResult] = useState<PhoneValidationResult | null>(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsRequestingDeletion(true);
    setError(null);
    setSuccess(false);

    try {
      const validationResult = await validatePhoneNumber(phoneNumber);
      setDeletionResult(validationResult);

      if (validationResult.isValid) {
        // Simulate account deletion process (replace with actual deletion logic)
        setTimeout(() => {
          setSuccess(true);
        }, 1500);
      } else {
        setError("Invalid phone number format. Please enter a valid phone number.");
      }
    } catch (e: any) {
      setError("Failed to validate the phone number. Please try again.");
    } finally {
      setIsRequestingDeletion(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.startsWith(defaultCountryCode)) {
      setPhoneNumber(value);
    } else {
      // If the user tries to delete the country code, reset it
      setPhoneNumber(defaultCountryCode);
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
            onChange={handleChange}
            required
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
          <ExclamationTriangle className="h-4 w-4"/>
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}

