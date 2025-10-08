import { useState, useEffect } from "react";
import MYFIRSTCOMPONENT from "./MYFIRSTCOMPONENT.jsx";
import "./side.css";

export default function Side() {
  const [showModal, setShowModal] = useState(false);
  const [formInput, setFormInput] = useState({
    name: "",
    countryCode: "+1",
    phonenumber: "",
    age: "",
    employed: false,
    salaryrange: "",
    loanAmount: 1000,
  });

  const [progress, setProgress] = useState(0);

  const countries = [
    { name: "USA", code: "+1", flag: "🇺🇸" },
    { name: "UK", code: "+44", flag: "🇬🇧" },
    { name: "France", code: "+33", flag: "🇫🇷" },
    { name: "Germany", code: "+49", flag: "🇩🇪" },
    { name: "India", code: "+91", flag: "🇮🇳" },
    { name: "Algeria", code: "+213", flag: "🇩🇿" },
    { name: "Pakistan", code: "+92", flag: "🇵🇰" },
    { name: "UAE", code: "+971", flag: "🇦🇪" },
  ];

  useEffect(() => {
    let completed = 0;
    if (formInput.name) completed += 20;
    if (/^\d{6,15}$/.test(formInput.phonenumber)) completed += 20;
    if (formInput.age) completed += 20;
    if (formInput.salaryrange) completed += 20;
    if (formInput.loanAmount > 0) completed += 20;
    setProgress(completed);
  }, [formInput]);

  const isDisabled =
    formInput.name.trim() === "" ||
    formInput.age.trim() === "" ||
    !/^\d{6,15}$/.test(formInput.phonenumber);

  const interestRate = formInput.employed ? 5 : 8;
  const monthlyPayment = ((formInput.loanAmount * (1 + interestRate / 100)) / 12).toFixed(2);

  function handleSubmit(event) {
    event.preventDefault();
    setShowModal(true);
  }

  return (
    <div className="form-wrapper">
      <h1>Loan Request Form</h1>

      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
      </div>

      <form onSubmit={handleSubmit} className="loan-form">
        <label>Full Name</label>
        <input
          type="text"
          value={formInput.name}
          onChange={(e) => setFormInput({ ...formInput, name: e.target.value })}
          placeholder="Enter your full name"
        />

        <label>Phone Number</label>
        <div className="phone-input-group">
          <select
            value={formInput.countryCode}
            onChange={(e) =>
              setFormInput({ ...formInput, countryCode: e.target.value })
            }
          >
            {countries.map((c) => (
              <option key={c.code} value={c.code}>
                {c.flag} {c.code}
              </option>
            ))}
          </select>

          <input
            type="tel"
            value={formInput.phonenumber}
            onChange={(e) =>
              setFormInput({ ...formInput, phonenumber: e.target.value })
            }
            placeholder="Enter phone number"
          />
        </div>
        {formInput.phonenumber &&
          !/^\d{6,15}$/.test(formInput.phonenumber) && (
            <span className="error-text">
              Please enter a valid phone number (6–15 digits)
            </span>
          )}

        <label>Age</label>
        <input
          type="number"
          min="18"
          max="100"
          value={formInput.age}
          onChange={(e) => setFormInput({ ...formInput, age: e.target.value })}
          placeholder="Enter your age"
        />

        <div className="switch-container">
          <label className="switch-label">Are you employed?</label>
          <label className="switch">
            <input
              type="checkbox"
              checked={formInput.employed}
              onChange={(e) =>
                setFormInput({ ...formInput, employed: e.target.checked })
              }
            />
            <span className="slider"></span>
          </label>
          <span className="switch-status">
            {formInput.employed ? "Yes" : "No"}
          </span>
        </div>
        <label>Salary Range</label>
        <select
          value={formInput.salaryrange}
          onChange={(e) =>
            setFormInput({ ...formInput, salaryrange: e.target.value })
          }
        >
          <option value="">Select your range</option>
          <option>Less than $500</option>
          <option>$500 - $1000</option>
          <option>More than $1000</option>
        </select>

        <label>Loan Amount ($)</label>
        <input
          type="range"
          min="500"
          max="10000"
          step="500"
          value={formInput.loanAmount}
          onChange={(e) =>
            setFormInput({ ...formInput, loanAmount: e.target.value })
          }
        />
        <div className="loan-preview">
          <span>Requested: ${formInput.loanAmount}</span>
          <span>Interest: {interestRate}%</span>
          <span>Est. Monthly: ${monthlyPayment}</span>
        </div>

        <button
          type="submit"
          disabled={isDisabled}
          className={isDisabled ? "disabled" : ""}
        >
          Submit Request
        </button>
      </form>

      <MYFIRSTCOMPONENT isVisible={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}
