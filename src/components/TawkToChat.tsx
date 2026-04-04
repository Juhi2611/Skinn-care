"use client";

import { useEffect } from "react";

/**
 * Tawk.to Live Chat Integration
 * GDPR-compliant live chat widget.
 * 
 * To use with your own Tawk.to account:
 * 1. Sign up at https://www.tawk.to/
 * 2. Get your Property ID and Widget ID
 * 3. Replace the placeholder values below
 */
const TawkToChat = () => {
  useEffect(() => {
    // Tawk.to integration script
    // Replace with your actual Tawk.to Property ID and Widget ID
    const TAWK_PROPERTY_ID = "69ce87c03008c11c3eb8734d";
    const TAWK_WIDGET_ID = "1jl7c4j73";

    const s1 = document.createElement("script");
    s1.async = true;
    s1.src = `https://embed.tawk.to/${TAWK_PROPERTY_ID}/${TAWK_WIDGET_ID}`;
    s1.charset = "UTF-8";
    s1.setAttribute("crossorigin", "*");

    document.head.appendChild(s1);

    return () => {
      // Cleanup script on unmount
      document.head.removeChild(s1);
    };
  }, []);

  return null;
};

export default TawkToChat;
