import { supabase } from "../../lib/supabaseClient";

export const createUser = async (public_address: string) => {
  try {
    // First, check if the user with the given public_address already exists
    const { data: existingUser, error: selectError } = await supabase
      .from("users")
      .select("*")
      .eq("public_address", public_address)
      .single();

    if (selectError && selectError.code !== "PGRST116") {
      throw new Error(selectError.message);
    }

    if (existingUser) {
      return { data: existingUser, error: null };
    }

    // User doesn't exist, create a new user
    const newUser = { public_address };
    const { data, error } = await supabase
      .from("users")
      .insert([newUser])
      .select();

    if (error) {
      throw new Error(error.message);
    }

    return { data: data[0], error: null };
  } catch (error) {
    return { data: null, error: `An error occurred: ${error}` };
  }
};

export const createEvent = async (
  host: string,
  location: string,
  capacity: number,
  name: string,
  start_date: string,
  end_date: string,
  type: string,
  description: string,
  timezone: string,
  host_name: string,
) => {
  try {
    const newEvent = {
      host,
      location,
      capacity,
      name,
      start_date,
      end_date,
      type,
      description,
      timezone,
      host_name,
    };
    const { data, error } = await supabase
      .from("events")
      .insert([newEvent])
      .select();

    if (error) {
      throw new Error(error.message);
    }

    return { data: data[0], error: null };
  } catch (error) {
    return { data: null, error: `An error occurred: ${error}` };
  }
};

export const joinEvent = async (event_id: string, attendee_id: string) => {
  try {
    const joinedEvent = { event_id, attendee_id };
    const { data, error } = await supabase
      .from("attendees")
      .insert([joinedEvent])
      .select();

    if (error) {
      throw new Error(error.message);
    }

    return { data: data[0], error: null };
  } catch (error) {
    return { data: null, error: `An error occurred: ${error}` };
  }
};

export const getAllEvent = async () => {
  try {
    const { data, error } = await supabase.from("events").select("*");
    if (error) {
      throw new Error(error.message);
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: `An error occurred: ${error}` };
  }
};

export const getSingleEvent = async (event_id: string) => {
  try {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("id", event_id);
    if (error) {
      throw new Error(error.message);
    }
    return { data, error: null };
  } catch (e) {
    return { data: null, error: `An error occurred: ${e}` };
  }
};

export const getEventAttendee = async (event_id: string) => {
  try {
    const { data, error } = await supabase
      .from("attendees")
      .select("*")
      .eq("event_id", event_id);
    if (error) {
      throw new Error(error.message);
    }
    return { data, error: null };
  } catch (e) {
    return { data: null, error: `An error occurred: ${e}` };
  }
};
