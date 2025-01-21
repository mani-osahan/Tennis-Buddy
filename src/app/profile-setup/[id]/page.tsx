"use client";
import {
  Avatar,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Select,
  SelectItem,
  RadioGroup,
  Radio,
  CheckboxGroup,
  Checkbox,
  DatePicker,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { utrOptions } from "../../ui/dashboard/modal/utrRating";
import { useRouter, useParams } from "next/navigation";
import { Request } from "express";
import { connect } from "@/dbConfig/dbConfig";
import Cookies from "js-cookie";

connect();

export default function ProfileSetup() {
  const [step, setStep] = useState(0);

  const router = useRouter();

  const [formData, setFormData] = useState({
    utrRating: [],
    experience: "",
    playStyle: "casual",
    courtSurface: [] as any,
    availability: [] as any,
    dateOfBirth: null,
    isProfileComplete: false,
  });
  useEffect(() => {
    removeCookies()
  }, [])

  const removeCookies = () => {
    Cookies.remove("isProfileComplete")
    Cookies.remove("userId")
    Cookies.remove("token")
  }
  const nextStep = () => setStep((prev) => prev + 1);

  const prevStep = () => setStep((prev) => prev - 1);

  const handleChange = (key: string, value: any) => {
    setFormData((prevData) => ({ ...prevData, [key]: value }));
  };

  const setupHeader = (headerText: String) => {
    return (
      <div className="flex p-2">
        <h1 className="mb-4 text-4xl text-green-500 font-bold">
          <span className="text-black">{headerText}</span>
        </h1>
      </div>
    );
  };

  const preferenceCheck = (selectedValues: string[]) => {
    if (selectedValues.includes("no-preference")) {
      handleChange("courtSurface", ["no-preference"]);
    } else {
      handleChange("courtSurface", selectedValues);
    }
  };

  const handleSubmit = async () => {
    try {
      console.log("Submitting formData:", formData);

      const response = await fetch("../api/users/profile-setup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log(result);

      if (response.ok) {
        console.log("Profile Successfully Created!", result);

        router.push("/dashboard");
      } else {
        console.error("Failed to Submit!", response);
      }
    } catch (error) {
      console.error("Error Submitting Profile:", error);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <>
            <div>{setupHeader("Tennis Preferences")}</div>

            <div className="p-2">
              <Select
                items={utrOptions}
                label="What's your UTR Rating"
                placeholder="UTR Rating"
                value={formData.utrRating}
                onChange={(value) => handleChange("utrRating", value)}
                isRequired
              >
                {(utrOptions) => (
                  <SelectItem key={utrOptions.value}>
                    {utrOptions.value}
                  </SelectItem>
                )}
              </Select>
            </div>

            <div className="p-2">
              <RadioGroup
                value={formData.playStyle}
                onValueChange={(value) => handleChange("playStyle", value)}
                label="What's your playstyle?"
                orientation="horizontal"
                size="md"
                isRequired
                color="success"
              >
                <Radio value="aggressive">Aggressive</Radio>
                <Radio value="casual">Casual</Radio>
                <Radio value="passive">Passive</Radio>
                <Radio value="all-rounder">All-Rounder</Radio>
              </RadioGroup>
            </div>

            <div className="p-2">
              <CheckboxGroup
                value={formData.courtSurface}
                label="Court Preference"
                orientation="vertical"
                isRequired
                onChange={preferenceCheck}
                color="success"
              >
                <div className="grid grid-cols-2 gap-4 p-2">
                  <Checkbox value="no-preference">No Preference</Checkbox>
                  <Checkbox
                    value="ashphalt"
                    isDisabled={formData.courtSurface.includes("no-preference")}
                  >
                    Ashphalt
                  </Checkbox>
                  <Checkbox
                    value="clay"
                    isDisabled={formData.courtSurface.includes("no-preference")}
                  >
                    Clay
                  </Checkbox>
                  <Checkbox
                    value="grass"
                    isDisabled={formData.courtSurface.includes("no-preference")}
                  >
                    Grass
                  </Checkbox>
                  <Checkbox
                    value="hard"
                    isDisabled={formData.courtSurface.includes("no-preference")}
                  >
                    Hard
                  </Checkbox>
                </div>
              </CheckboxGroup>
            </div>
          </>
        );
      case 1:
        return (
          <>
            <div>{setupHeader("Availability")}</div>
            <CheckboxGroup
              value={formData.availability}
              label="What's your availability?"
              isRequired
              onChange={(value) => handleChange("availability", value)}
              color="success"
            >
              <div className="grid grid-cols-2 gap-4 p-2">
                <Checkbox value="monday">Monday</Checkbox>
                <Checkbox value="tuesday">Tuesday</Checkbox>
                <Checkbox value="wednesday">Wednesday</Checkbox>
                <Checkbox value="thursday">Thursday</Checkbox>
                <Checkbox value="friday">Friday</Checkbox>
                <Checkbox value="saturday">Saturday</Checkbox>
                <Checkbox value="sunday">Sunday</Checkbox>
              </div>
            </CheckboxGroup>
          </>
        );
      case 2:
        return (
          <>
            <div className="flex">{setupHeader("Lets Setup Your Profile")}</div>

            {/* <div>
              <Avatar
                className="absolute top-16 hover:opacity-100 "
                src="https://www.svgrepo.com/show/309379/camera-add.svg"
              />
              <Avatar className="hover:bg-gray-400 hover:opacity-20" />
            </div> */}

            <div>
              <DatePicker
                value={formData.dateOfBirth}
                label="Date of Birth"
                showMonthAndYearPickers
                onChange={(value) => handleChange("dateOfBirth", value)}
              />
            </div>

            <div></div>
          </>
        );

      case 3:
        return (
          <>
            <h1>We're all good to go! </h1>
            <h1>Let's go to the main event!</h1>

            <Button
              onClick={() => {
                formData.isProfileComplete = true;
                handleSubmit();
              }}
              color="success"
            >
              Submit
            </Button>
          </>
        );
    }
  };

  return (
    <div className="relative container m-auto px-6 text-gray-500 md:px-12 xl:px-40">
      <div className="m-auto md:w-8/12 lg:w-6/12 xl:w-6/12">
        <div className="rounded-xl bg-white shadow-xl">
          <div>
            <Card>
              <CardBody>
                <h1 className="flex flex-start justify-end justify-baseline bg-grey-200 opacity-30">
                  {step + 1} of 4
                </h1>
                {renderStep()}
              </CardBody>
              <CardFooter>
                {step >= 1 && (
                  <Button onClick={prevStep} color="secondary">
                    Go Back!
                  </Button>
                )}
                {step < 3 && (
                  <Button
                    disabled={step === 3}
                    onClick={nextStep}
                    color="success"
                  >
                    Next
                  </Button>
                )}
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
