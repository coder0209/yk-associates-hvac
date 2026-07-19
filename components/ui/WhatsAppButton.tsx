'use strict';

'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';
import { DEFAULT_CONTACT } from '@/lib/config';

interface WhatsAppButtonProps {
  projectName?: string;
}

export default function WhatsAppButton({ projectName }: WhatsAppButtonProps) {
  // Clean phone number (remove spaces, plus, dashes)
  const cleanNumber = DEFAULT_CONTACT.whatsapp.replace(/[^\d]/g, '');

  // Prefilled text message
  const defaultText = "Hello, I visited your website and would like to discuss an HVAC requirement.";
  const projectText = projectName
    ? `Hello, I would like to discuss an HVAC project similar to "${projectName}".`
    : defaultText;

  const encodedText = encodeURIComponent(projectText);
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodedText}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 flex items-center justify-center h-14 w-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg transition-transform duration-300 hover:scale-115 active:scale-95 group focus:ring-4 focus:ring-green-300"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="h-7 w-7 fill-current" />
      
      {/* Subtle Hover Tooltip */}
      <span className="absolute right-16 scale-0 group-hover:scale-100 transition-all duration-200 origin-right bg-slate-900 text-white text-xs font-semibold px-3 py-1.5 rounded shadow-md whitespace-nowrap">
        Chat on WhatsApp
      </span>
    </a>
  );
}
