const API_URL = process.env.NEXT_PUBLIC_APP_URL;

export const authApi = {
  sendOtp: async (
    email: string,
    type: "email-verification" | "password-reset" = "email-verification"
  ) => {
    const response = await fetch(`${API_URL}/api/auth/send-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, type }),
    });
    return response.json();
  },

  verifyOtp: async (
    email: string,
    otp: string,
    type: "email-verification" | "password-reset" = "email-verification"
  ) => {
    const response = await fetch(`${API_URL}/api/auth/verify-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp, type }),
    });
    return response.json();
  },

  updateEmailVerified: async (email: string) => {
    const response = await fetch(`${API_URL}/api/auth/update-email-verified`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    return response.json();
  },

  resetPassword: async (email: string, otp: string, newPassword: string) => {
    const response = await fetch(`${API_URL}/api/auth/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp, newPassword }),
    });
    return response.json();
  },
};
