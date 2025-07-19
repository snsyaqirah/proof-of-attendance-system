import React, { useEffect, useState } from 'react';

type AttendanceBadge = {
  objectId: string;
  objectType: string;
  digest: string;
  version: number;
};

const EventList: React.FC = () => {
  const [badges, setBadges] = useState<AttendanceBadge[]>([]);
  const [loading, setLoading] = useState(true);

  const owner = "0x97e706f971c7e2c5f20939c5f3b37271b742eeb1fea03aa9c9341c614bc24a34";

  useEffect(() => {
    const fetchBadges = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/objects/${owner}`);
        const data = await res.json();
        setBadges(data);
      } catch (err) {
        console.error('Failed to fetch objects:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBadges();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">All Created Events / Badges</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="space-y-2">
          {badges.map((badge, index) => (
            <li key={index} className="p-4 border rounded shadow">
              <p><strong>ID:</strong> {badge.objectId}</p>
              <p><strong>Type:</strong> {badge.objectType}</p>
              <p><strong>Digest:</strong> {badge.digest}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EventList;