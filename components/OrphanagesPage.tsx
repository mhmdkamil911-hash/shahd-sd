import React, { useContext, useState } from 'react';
import Card from './common/Card';
import { AppContext } from '../App';

const orphanages = [
    { id: 1, name: "دار المستقبل للأيتام", state: "الخرطوم", city: "الخرطوم", capacity: 50 },
    { id: 2, name: "مركز الأمل لرعاية الأطفال", state: "الجزيرة", city: "ود مدني", capacity: 30 },
    { id: 3, name: "بيت الطفولة السعيدة", state: "كسلا", city: "كسلا", capacity: 40 },
    { id: 4, name: "قرية الأطفال SOS", state: "الخرطوم", city: "بحري", capacity: 120 },
    { id: 5, name: "دار النور للأيتام", state: "شمال كردفان", city: "الأبيض", capacity: 25 },
];

const states = ["الخرطوم", "الجزيرة", "كسلا", "شمال كردفان"];

const OrphanagesPage: React.FC = () => {
    const { t } = useContext(AppContext);
    const [selectedState, setSelectedState] = useState<string>('all');

    const filteredOrphanages = selectedState === 'all'
        ? orphanages
        : orphanages.filter(o => o.state === selectedState);

    return (
        <div>
            <h1 className="text-3xl font-bold mb-2 text-gray-800">{t('orphanagesDirectory')}</h1>
            
            <div className="mb-6">
                <label htmlFor="state-filter" className="sr-only">{t('filterByState')}</label>
                <select 
                    id="state-filter"
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                    className="mt-1 block w-full md:w-1/3 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-shahd-gold focus:border-shahd-gold sm:text-sm rounded-md"
                >
                    <option value="all">{t('allStates')}</option>
                    {states.map(state => <option key={state} value={state}>{state}</option>)}
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredOrphanages.map(org => (
                    <Card key={org.id} className="p-6">
                        <h2 className="text-xl font-bold text-shahd-accent">{org.name}</h2>
                        <p className="text-gray-600 mt-2">{org.city}, {org.state}</p>
                        <p className="text-sm text-gray-500 mt-1">السعة: {org.capacity} طفل</p>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default OrphanagesPage;
