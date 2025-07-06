import axios from "axios";
import React, { useState } from "react";

const Transferesave = () => {
  const [accountNumber, setAccountNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [accountInfo, setAccountInfo] = useState(null);
  const [error, setError] = useState(null);

  const handleAccountChange = async (e) => {
    const value = e.target.value;
    setAccountNumber(value);
    
    // Only make API call when length is exactly 11
    if (value.length === 11) {
      try {
        setIsLoading(true);
        setError(null);
        const response = await axios.post(
          "http://localhost:5005/user/resolveAccount",
          { accountNumber: value }
        );
        setAccountInfo(response.data);
      } catch (error) {
        setError("Failed to resolve account");
        console.error("Account resolution error:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Input account number"
        value={accountNumber}
        onChange={handleAccountChange}
        maxLength={11}
      />
      {isLoading && <p>Resolving account...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {accountInfo && (
        <div>
          <img src={accountInfo.profileImage} alt="" />
          <p>Account Name: {accountInfo.firstName+' '+ accountInfo.lastName}</p>
         
        
        </div>
      )}
    </div>
  );
};

export default Transferesave;