import { createCurrentUserHook, createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

export const config = {
  /**
   * Find your project ID and dataset in `sanity.json` in your studio project.
   * These are considered “public”, but you can use environment variables
   * if you want differ between local dev and production.
   *
   * https://nextjs.org/docs/basic-features/environment-variables
   **/
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  apiVersion: "2022-10-26", // or today's date for latest
  /**
   * Set useCdn to `false` if your application require the freshest possible
   * data always (potentially slightly slower and a bit more expensive).
   * Authenticated request (like preview) will always bypass the CDN
   **/
  useCdn: process.env.NODE_ENV === "production",
};

// Set up the client for fetching data in the getProps function
export const sanityClient = createClient(config);

/**
 * Set up a helper function for generating image URls with only the asset reference data in your documents
 */

export const urlFor = (source) => imageUrlBuilder(config).image(source);

// Helper function for using the current logged in current account

export const useCurrentUser = createCurrentUserHook(config);
