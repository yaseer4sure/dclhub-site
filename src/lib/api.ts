// API utilities for DCL HUB

import { projectId, publicAnonKey } from '../utils/supabase/info';

const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-143d3f93`;

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${publicAnonKey}`,
};

// Event Registration
export async function submitEventRegistration(data: {
  eventId: string;
  fullName: string;
  email: string;
  phone: string;
  attendanceType: string;
  organization?: string;
}) {
  try {
    const response = await fetch(`${API_BASE_URL}/event-registration`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to submit registration');
    }

    return await response.json();
  } catch (error) {
    console.error('Event registration API error:', error);
    throw error;
  }
}

export async function getEventRegistrations(eventId: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/event-registrations/${eventId}`, {
      headers,
    });

    if (!response.ok) {
      throw new Error('Failed to fetch event registrations');
    }

    return await response.json();
  } catch (error) {
    console.error('Fetch event registrations API error:', error);
    throw error;
  }
}

// Donations
export async function submitDonation(data: {
  amount: string;
  frequency: string;
  paymentMethod: string;
  campaignId?: string;
}) {
  try {
    const response = await fetch(`${API_BASE_URL}/donation`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to process donation');
    }

    return await response.json();
  } catch (error) {
    console.error('Donation API error:', error);
    throw error;
  }
}

export async function getDonations() {
  try {
    const response = await fetch(`${API_BASE_URL}/donations`, {
      headers,
    });

    if (!response.ok) {
      throw new Error('Failed to fetch donations');
    }

    return await response.json();
  } catch (error) {
    console.error('Fetch donations API error:', error);
    throw error;
  }
}

// Volunteers
export async function submitVolunteerApplication(data: {
  name: string;
  email: string;
  phone: string;
  skills: string;
  availability: string;
  message?: string;
}) {
  try {
    const response = await fetch(`${API_BASE_URL}/volunteer`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to submit application');
    }

    return await response.json();
  } catch (error) {
    console.error('Volunteer application API error:', error);
    throw error;
  }
}

export async function getVolunteers() {
  try {
    const response = await fetch(`${API_BASE_URL}/volunteers`, {
      headers,
    });

    if (!response.ok) {
      throw new Error('Failed to fetch volunteers');
    }

    return await response.json();
  } catch (error) {
    console.error('Fetch volunteers API error:', error);
    throw error;
  }
}

// Partnerships
export async function submitPartnershipInquiry(data: {
  organizationName: string;
  contactPerson: string;
  email: string;
  phone: string;
  partnershipType: string;
  message: string;
}) {
  try {
    const response = await fetch(`${API_BASE_URL}/partnership`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to submit partnership inquiry');
    }

    return await response.json();
  } catch (error) {
    console.error('Partnership inquiry API error:', error);
    throw error;
  }
}

export async function getPartnerships() {
  try {
    const response = await fetch(`${API_BASE_URL}/partnerships`, {
      headers,
    });

    if (!response.ok) {
      throw new Error('Failed to fetch partnerships');
    }

    return await response.json();
  } catch (error) {
    console.error('Fetch partnerships API error:', error);
    throw error;
  }
}

// Contact Form
export async function submitContactForm(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  try {
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to submit contact form');
    }

    return await response.json();
  } catch (error) {
    console.error('Contact form API error:', error);
    throw error;
  }
}

export async function getContacts() {
  try {
    const response = await fetch(`${API_BASE_URL}/contacts`, {
      headers,
    });

    if (!response.ok) {
      throw new Error('Failed to fetch contacts');
    }

    return await response.json();
  } catch (error) {
    console.error('Fetch contacts API error:', error);
    throw error;
  }
}

// Campaign Stats
export async function getCampaignStats(campaignId: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/campaign-stats/${campaignId}`, {
      headers,
    });

    if (!response.ok) {
      throw new Error('Failed to fetch campaign stats');
    }

    return await response.json();
  } catch (error) {
    console.error('Campaign stats API error:', error);
    throw error;
  }
}
