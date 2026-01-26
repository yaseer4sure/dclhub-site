import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-143d3f93/health", (c) => {
  return c.json({ status: "ok" });
});

// Event Registrations
app.post("/make-server-143d3f93/event-registration", async (c) => {
  try {
    const body = await c.req.json();
    const { eventId, fullName, email, phone, attendanceType, organization } = body;

    if (!eventId || !fullName || !email || !phone || !attendanceType) {
      return c.json({ error: "Missing required fields" }, 400);
    }

    const registrationId = `event_reg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const registration = {
      id: registrationId,
      eventId,
      fullName,
      email,
      phone,
      attendanceType,
      organization,
      registeredAt: new Date().toISOString(),
    };

    await kv.set(`event_registration:${registrationId}`, registration);

    // Track registration count for event
    const countKey = `event_registration_count:${eventId}`;
    const currentCount = await kv.get(countKey);
    const newCount = currentCount ? parseInt(currentCount as string) + 1 : 1;
    await kv.set(countKey, newCount.toString());

    console.log(`Event registration created: ${registrationId} for event ${eventId}`);
    return c.json({ success: true, registrationId, registration });
  } catch (error) {
    console.error("Error creating event registration:", error);
    return c.json({ error: "Failed to create registration" }, 500);
  }
});

app.get("/make-server-143d3f93/event-registrations/:eventId", async (c) => {
  try {
    const eventId = c.req.param("eventId");
    const registrations = await kv.getByPrefix(`event_registration:`);
    const eventRegistrations = registrations.filter(
      (reg: any) => reg.value?.eventId === eventId
    );
    
    return c.json({ registrations: eventRegistrations.map((r: any) => r.value) });
  } catch (error) {
    console.error("Error fetching event registrations:", error);
    return c.json({ error: "Failed to fetch registrations" }, 500);
  }
});

// Donations
app.post("/make-server-143d3f93/donation", async (c) => {
  try {
    const body = await c.req.json();
    const { amount, frequency, paymentMethod, campaignId } = body;

    if (!amount || !frequency || !paymentMethod) {
      return c.json({ error: "Missing required fields" }, 400);
    }

    const donationId = `donation_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const donation = {
      id: donationId,
      amount: parseFloat(amount),
      frequency,
      paymentMethod,
      campaignId,
      donatedAt: new Date().toISOString(),
      status: "completed",
    };

    await kv.set(`donation:${donationId}`, donation);

    // Update campaign total if campaignId provided
    if (campaignId) {
      const totalKey = `campaign_total:${campaignId}`;
      const currentTotal = await kv.get(totalKey);
      const newTotal = currentTotal ? parseFloat(currentTotal as string) + parseFloat(amount) : parseFloat(amount);
      await kv.set(totalKey, newTotal.toString());
    }

    console.log(`Donation created: ${donationId} for amount ${amount}`);
    return c.json({ success: true, donationId, donation });
  } catch (error) {
    console.error("Error processing donation:", error);
    return c.json({ error: "Failed to process donation" }, 500);
  }
});

app.get("/make-server-143d3f93/donations", async (c) => {
  try {
    const donations = await kv.getByPrefix(`donation:`);
    return c.json({ donations: donations.map((d: any) => d.value) });
  } catch (error) {
    console.error("Error fetching donations:", error);
    return c.json({ error: "Failed to fetch donations" }, 500);
  }
});

// Volunteer Applications
app.post("/make-server-143d3f93/volunteer", async (c) => {
  try {
    const body = await c.req.json();
    const { name, email, phone, skills, availability, message } = body;

    if (!name || !email || !phone || !skills || !availability) {
      return c.json({ error: "Missing required fields" }, 400);
    }

    const volunteerId = `volunteer_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const volunteer = {
      id: volunteerId,
      name,
      email,
      phone,
      skills,
      availability,
      message,
      appliedAt: new Date().toISOString(),
      status: "pending",
    };

    await kv.set(`volunteer:${volunteerId}`, volunteer);

    console.log(`Volunteer application created: ${volunteerId}`);
    return c.json({ success: true, volunteerId, volunteer });
  } catch (error) {
    console.error("Error creating volunteer application:", error);
    return c.json({ error: "Failed to create volunteer application" }, 500);
  }
});

app.get("/make-server-143d3f93/volunteers", async (c) => {
  try {
    const volunteers = await kv.getByPrefix(`volunteer:`);
    return c.json({ volunteers: volunteers.map((v: any) => v.value) });
  } catch (error) {
    console.error("Error fetching volunteers:", error);
    return c.json({ error: "Failed to fetch volunteers" }, 500);
  }
});

// Partnership Inquiries
app.post("/make-server-143d3f93/partnership", async (c) => {
  try {
    const body = await c.req.json();
    const { organizationName, contactPerson, email, phone, partnershipType, message } = body;

    if (!organizationName || !contactPerson || !email || !phone || !partnershipType || !message) {
      return c.json({ error: "Missing required fields" }, 400);
    }

    const partnershipId = `partnership_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const partnership = {
      id: partnershipId,
      organizationName,
      contactPerson,
      email,
      phone,
      partnershipType,
      message,
      submittedAt: new Date().toISOString(),
      status: "pending",
    };

    await kv.set(`partnership:${partnershipId}`, partnership);

    console.log(`Partnership inquiry created: ${partnershipId}`);
    return c.json({ success: true, partnershipId, partnership });
  } catch (error) {
    console.error("Error creating partnership inquiry:", error);
    return c.json({ error: "Failed to create partnership inquiry" }, 500);
  }
});

app.get("/make-server-143d3f93/partnerships", async (c) => {
  try {
    const partnerships = await kv.getByPrefix(`partnership:`);
    return c.json({ partnerships: partnerships.map((p: any) => p.value) });
  } catch (error) {
    console.error("Error fetching partnerships:", error);
    return c.json({ error: "Failed to fetch partnerships" }, 500);
  }
});

// Contact Form Submissions
app.post("/make-server-143d3f93/contact", async (c) => {
  try {
    const body = await c.req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return c.json({ error: "Missing required fields" }, 400);
    }

    const contactId = `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const contact = {
      id: contactId,
      name,
      email,
      subject,
      message,
      submittedAt: new Date().toISOString(),
      status: "unread",
    };

    await kv.set(`contact:${contactId}`, contact);

    console.log(`Contact form submission created: ${contactId}`);
    return c.json({ success: true, contactId, contact });
  } catch (error) {
    console.error("Error creating contact form submission:", error);
    return c.json({ error: "Failed to create contact submission" }, 500);
  }
});

app.get("/make-server-143d3f93/contacts", async (c) => {
  try {
    const contacts = await kv.getByPrefix(`contact:`);
    return c.json({ contacts: contacts.map((c: any) => c.value) });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return c.json({ error: "Failed to fetch contacts" }, 500);
  }
});

// Campaign Management
app.get("/make-server-143d3f93/campaign-stats/:campaignId", async (c) => {
  try {
    const campaignId = c.req.param("campaignId");
    const totalKey = `campaign_total:${campaignId}`;
    const total = await kv.get(totalKey);
    
    return c.json({ 
      campaignId, 
      totalRaised: total ? parseFloat(total as string) : 0 
    });
  } catch (error) {
    console.error("Error fetching campaign stats:", error);
    return c.json({ error: "Failed to fetch campaign stats" }, 500);
  }
});

Deno.serve(app.fetch);