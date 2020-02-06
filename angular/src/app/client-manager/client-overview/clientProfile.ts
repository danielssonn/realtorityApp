import { Client } from "../client-manager-search/client";

/**
 * What do we know about the Client
 */

export interface ClientActivity {
    clicked?: number;
    trackedTotal?: number;
    trackedActive?: number;
    recos?: number;


}
export interface ClientVisits {
    totalVisits?: number;
    next?: {
        date?: string;
        place?: string;
    }


}
export interface ClientPreferences {
    hoods?: string[];

    detached?: String,
    semi?: String,
    condo?: String,
    townhouse?: String

    priceFrom?: string;
    priceTo?: string;
    beds?: [];
    baths?: [];

}

export interface ClientProfile {
    client: Client;
    engagement?: { level: String, color: String };
    lastInteraction?: string;
    activity?: ClientActivity;
    preferences?: ClientPreferences;
    visits?: ClientVisits;

}