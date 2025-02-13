"use client";
import {
  SessionProvider,
  useSessionContext,
} from "@/app/contexts/sessionContext";
import { insertProfile } from "@/app/api/dashboard/session";
import Input from "@/app/ui/signup/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import MapComponent from "@/app/ui/dashboard/main/mapComponent";

export default function ProfileSetup() {
  const { session, userProfile } = useSessionContext();
  const router = useRouter();

  // console.log(userProfile);

  const [profile, setProfile] = useState({
    username: "",
    utr_rating: 0.0,
    experience: 0,
    play_style: "",
    level: 0,
    court_surface: "",
    availability: "",
    location: "",
    wins: 0,
    losses: 0,
    years_played: 0,
    tournament_experience: false,
  });

  const [step, setStep] = useState(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile.username || !profile.utr_rating) {
      alert("Please fill in all fields");
      return;
    }

    const insertuser = await insertProfile(profile);

    console.log("User created:", insertuser);
    router.push("/dashboard");
  };

  const handleNext = () => setStep(step + 1);
  const handlePrev = () => setStep(step - 1);

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="flex flex-col w-full m-auto gap-1 p-2">
            <label htmlFor="username" className="text-left">
              Username
            </label>
            <Input
              type="text"
              placeholder="username"
              name="username"
              value={profile.username}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setProfile({
                  ...profile,
                  username: e.target.value,
                })
              }
              required
            />

            <label htmlFor="utr_rating">UTR Rating</label>
            <select
              className="max-w-md relative border-gray-300 bg-white w-full  text-text text-sm border p-2 rounded-md"
              value={profile.utr_rating}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  utr_rating: parseFloat(e.target.value),
                })
              }
            >
              <option value="">Select Rating</option>
              {[...Array(7)].map((_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1}.0
                </option>
              ))}
            </select>
          </div>
        );
      case 2:
        return (
          <div className="flex flex-col gap-1 p-2">
            <label htmlFor="experience">Years of Experience</label>
            <select
              className="relative border-gray-300 bg-white w-full text-text text-sm border p-2 rounded-md"
              defaultValue={0}
              value={profile.experience}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  experience: parseInt(e.target.value),
                })
              }
              required={false}
            >
              <option value="0"> Less Than 1 Year </option>
              {[...Array(9)].map((_, i) => (
                <option key={i} value={i}>
                  {" "}
                  {i + 1}
                </option>
              ))}
              <option value="1"></option>
            </select>

            <label htmlFor="tournament_experience">Tournament Experience</label>

            <input
              type="radio"
              className="relative border-gray-300 bg-white w-full text-text text-sm border p-2 rounded-md"
              name=""
              value={"true"}
              id="tournament_true"
            />
            <label htmlFor="tournament_true">True</label>
            <input
              type="radio"
              className="relative border-gray-300 bg-white w-full text-text text-sm border p-2 rounded-md"
              name=""
              value={"false"}
              id="tournament_false"
            />
            <label htmlFor="tournament_false">False</label>
            <label htmlFor="play_style">Play Style</label>
            <select
              className="relative border-gray-300 bg-white w-full  text-text text-sm border p-2 rounded-md"
              name="play_style"
              id="play_style"
              value={profile.play_style}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setProfile({
                  ...profile,
                  play_style: e.target.value,
                })
              }
              defaultValue={"n/a"}
            >
              <option value="n/a">Not Sure</option>
              <option value="Aggressive">Aggressive</option>
              <option value="Conservative">Conservative</option>
              <option value="Balanced">Balanced</option>
            </select>
          </div>
        );

      case 3:
        return (
          <div className="flex flex-col gap-1 p-2">
            <label htmlFor="court_surface">Court Surface</label>
            <select
              className="relative border-gray-300 bg-white w-full text-text text-sm border p-2 rounded-md"
              name="court_surface"
              id="court_surface"
              value={profile.court_surface}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setProfile({
                  ...profile,
                  court_surface: e.target.value,
                })
              }
              defaultValue={"n/a"}
            >
              <option value="n/a">No Preference</option>
              <option value="Clay">Clay</option>
              <option value="Grass">Grass</option>
              <option value="Hard">Hard</option>
            </select>

            <label htmlFor="availability">Availability</label>
            <select
              className="relative border-gray-300 bg-white w-full  text-text text-sm border p-2 rounded-md"
              name="availability"
              id="availability"
              value={profile.availability}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setProfile({
                  ...profile,
                  availability: e.target.value,
                })
              }
            >
              <option value="n/a">No Preference</option>
              <option value="Weekends">Weekends</option>
              <option value="Weekdays">Weekdays</option>
            </select>

            <label htmlFor="location">Location</label>
            <select
              className="relative border-gray-300 bg-white w-full  text-text text-sm border p-2 rounded-md"
              name="location"
              id="location"
              value={profile.location}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setProfile({
                  ...profile,
                  location: e.target.value,
                })
              }
            >
              <option value="n/a">Not Sure</option>
              <option value="Local">Local</option>
              <option value="Remote">Remote</option>
            </select>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <SessionProvider>
      <div className="relative py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="relative container m-auto px-6 text-gray-500 md:px-12 xl:px-40">
          <div className="m-auto md:w-8/12 lg:w-6/12 xl:w-6/12">
            <div className="rounded-xl bg-white shadow-xl">
              <div className="p-2 sm:px-14 sm:py-20 justify-center align-middle">
                <h1 className="mb-4 text-4xl text-green-500 font-bold">
                  <span className="text-black">Profile </span> Setup
                </h1>
                <div className="mt-4 flex gap-2">
                  {[1, 2, 3].map((num) => (
                    <div
                      key={num}
                      className={`w-1/3 h-2 rounded ${
                        step >= num ? "bg-green-500" : "bg-gray-200"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <form
                className="flex flex-col gap-2"
                onSubmit={(e: React.FormEvent) => {
                  if (step === 3) {
                    handleSubmit(e);
                  } else {
                    e.preventDefault();
                    handleNext();
                  }
                }}
              >
                {renderStep()}
                <div className="mt-8 flex justify-between p-2 items-center">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="px-4 py-2 border rounded hover:bg-gray-50"
                    >
                      Back
                    </button>
                  )}
                  <button
                    type="submit"
                    className="ml-auto px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
                  >
                    {step === 3 ? "Complete Setup" : "Continue"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </SessionProvider>
  );
}
