import React, { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { X } from "lucide-react";
import { Alert } from "@mui/material";
import axios from "axios";
import useStore from "../../store";

const Input = () => {
    const { setShortURL, shortURL } = useStore();

    const [isLoading, setIsLoading] = useState(false);
    const [value, setValue] = useState("");
    const [message, setMessage] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [alertType, setAlertType] = useState("error");

    const isValidURL = (url) => {
        const regex = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/i;

        if (!regex.test(url)) return false;

        try {
            new URL(url.startsWith("http") ? url : "https://" + url);
            return true;
        } catch {
            return false;
        }
    };

    const handleClick = async () => {
        if (isLoading) return;
        if (value === "") {
            setMessage("Please enter URL");
            setAlertType("error");
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 4000);
            return;
        }

        if (!isValidURL(value)) {
            setMessage("Entered URL is not valid");
            setAlertType("error");
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 4000);
            return;
        }

        try {
            setIsLoading(true);

            const response = await axios.post(
                `${import.meta.env.VITE_HOSTSERVER}/api/add/link`,
                {
                    email: "sujalsaini3304@gmail.com",
                    originalURL: value,
                }
            );

            if (response?.data?.shortURL) {
                setShortURL(response.data.shortURL);

                setMessage("Short URL generated successfully!");
                setAlertType("success");
                setShowAlert(true);
                setTimeout(() => {
                    setShowAlert(false);
                }, 4000);
            }
        } catch (error) {
            setMessage("Something went wrong. Try again.");
            setAlertType("error");
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 4000);
        } finally {
            setIsLoading(false);
        }
    };

    const handleClear = () => {
        setValue("");
    };

    return (
        <>
            <div className="mt-2 mb-2 w-full shadow-sm flex items-center justify-center h-64 rounded-sm px-2 py-4">
                <div className="w-full max-w-140 flex flex-col items-center gap-4">

                    {showAlert && (
                        <div className="w-full">
                            <Alert severity={alertType}>{message}</Alert>
                        </div>
                    )}

                    {value && (
                        <div className="flex w-full justify-end px-2 h-10">
                            <button className="hover:cursor-pointer" onClick={handleClear}>
                                <X size={22} />
                            </button>
                        </div>
                    )}

                    <input
                        onChange={(e) => {
                            setValue(e.target.value)
                            setShortURL(null);
                        }}
                        disabled={isLoading}
                        value={value}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") handleClick();
                        }}
                        type="text"
                        placeholder="Enter your URL"
                        className="rounded-sm h-10 w-full px-3 border focus:outline-none focus:border-2"
                    />

                    {isLoading ? (
                        <div className="h-10 flex items-center gap-2 text-sm">
                            <CircularProgress size="22px" />
                            Please wait...
                        </div>
                    ) : (
                        <button
                            onClick={handleClick}
                            className="w-full hover:cursor-pointer text-lg rounded-sm bg-gradient-to-r from-orange-400 to-purple-400 h-10 text-white hover:opacity-90 transition"
                        >
                            Generate Short URL
                        </button>
                    )}
                </div>
            </div>

            {shortURL && (
                <p className="py-6  text-center text-blue-500 underline break-all">
                    <span className="shadow-sm p-2 ">
                        <a href={shortURL} target="_blank" rel="noopener noreferrer">
                            {shortURL}
                        </a>
                    </span>
                </p>
            )}
        </>
    );
};

export default Input;