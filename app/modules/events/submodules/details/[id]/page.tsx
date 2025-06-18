// app/details/[id]/page.tsx
'use client';

import React, { useEffect, useState } from 'react';

import { Detail } from '../types/types'; // Assuming Detail type is defined here
import { selectSingle } from '@/app/actions/selectSingle';
import DetailViewer from '../components/DetailViewer'; // Corrected import path, assuming DetailViewer is in components subdir

import { useParams } from 'next/navigation';
import { Event } from '../../creator/types/types';


const Page: React.FC = () => {
  const params = useParams<{id:string}>()
 const event_id = params?.id

 console.log("Event ID from URL:", event_id)

    const [detailData, setDetailData] = useState<Detail | null>(null); // State for detail data
    const [eventData, setEventData] = useState<Event | null>(null); // State for event data
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchEventAndDetail = async () => {
            setLoading(true);
            setError(null);

            try {
                // Fetch both detail and event data concurrently using Promise.all
                const [detailResult, eventResult] = await Promise.all([
                    selectSingle<Detail>('details', 'event_id', event_id), // Fetch detail by event_id
                    selectSingle<Event>('events', 'id', event_id)       // Fetch event by id (which is event_id from URL)
                ]);

                if (detailResult) {
                    setDetailData(detailResult);
                } else {
                    console.warn("No details found for event ID:", event_id); // Optional: Log warning if no detail
                    setDetailData(null); // Ensure detailData is null
                }

                if (eventResult) {
                    setEventData(eventResult);
                } else {
                    setError(new Error("Evento no encontrado.")); // Set error if no event found - this is more critical
                    setEventData(null); // Ensure eventData is null
                }


            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (fetchError: any) {
                console.error("Error fetching event details:", fetchError);
                setError(fetchError instanceof Error ? fetchError : new Error("Error fetching event and details"));
                setDetailData(null);
                setEventData(null);
            } finally {
                setLoading(false);
            }
        };

        if (event_id) { // Only fetch if event_id is available
            fetchEventAndDetail();
        } else {
            setError(new Error("ID de evento no proporcionado en la URL."));
            setLoading(false); // End loading even if no fetch is made due to missing id
        }

    }, [event_id]); // useEffect dependency on event_id


    if (loading) {
        return <div>Cargando detalles del evento...</div>;
    }

    if (error) {
        return <div className="text-red-500">Error al cargar detalles: {error.message}</div>;
    }

    return (
        <div>
            {detailData && eventData ? ( // Conditionally render DetailViewer only if both detailData and eventData are available
                <DetailViewer detailData={detailData} eventData={eventData} /> // Pass both detailData and eventData
            ) : (
                <div>No hay detalles disponibles para este evento.</div>
            )}
        </div>
    );
};

export default Page;