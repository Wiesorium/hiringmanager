import type { Candidate } from '../types';
import { cn } from '../lib/utils';
import { BadgeCheck, Eye, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface CandidateCardProps {
    candidate: Candidate;
    isSelected: boolean;
    onSelect: (id: string) => void;
    onView: (candidate: Candidate) => void;
    onReject?: (id: string) => void;
}

export function CandidateCard({ candidate, isSelected, onSelect, onView, onReject }: CandidateCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            className={cn(
                "bg-white p-6 rounded-lg shadow-sm border transition-all relative group",
                isSelected ? "border-highlight ring-1 ring-highlight shadow-md" : "border-stone-200 hover:border-stone-400"
            )}
        >
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="font-serif font-bold text-lg leading-tight">{candidate.name}</h3>
                    <p className="text-sm text-muted">{candidate.resume.lastRole} bei {candidate.resume.company}</p>
                </div>
                <div className="text-xs bg-stone-100 px-2 py-1 rounded font-medium text-stone-600">
                    {candidate.resume.yearsOfExperience}J Erf.
                </div>
            </div>

            <p className="text-sm line-clamp-3 mb-4 text-ink/80 font-serif italic border-l-2 border-stone-200 pl-3">
                "{candidate.coverLetter}"
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
                {candidate.attributes.skills.slice(0, 3).map(skill => (
                    <span key={skill} className="text-xs px-2 py-0.5 bg-stone-50 border border-stone-200 rounded text-stone-600">
                        {skill}
                    </span>
                ))}
            </div>

            <div className="flex gap-2 mt-auto pt-4 border-t border-stone-100">
                <button
                    onClick={() => onView(candidate)}
                    className="flex-1 py-2 text-sm font-medium hover:bg-stone-50 rounded flex items-center justify-center gap-2 text-muted hover:text-ink transition-colors"
                >
                    <Eye className="w-4 h-4" />
                    Details
                </button>
                <button
                    onClick={() => onSelect(candidate.id)}
                    className={cn(
                        "flex-1 py-2 text-sm font-bold rounded flex items-center justify-center gap-2 transition-colors",
                        isSelected
                            ? "bg-highlight text-white hover:bg-highlight/90"
                            : "bg-ink text-paper hover:bg-black"
                    )}
                >
                    {isSelected ? <BadgeCheck className="w-4 h-4" /> : <div className="w-4 h-4" />}
                    {isSelected ? "Ausgewählt" : "Auswählen"}
                </button>
                {onReject && (
                    <button
                        onClick={() => onReject(candidate.id)}
                        title="Kandidat ablehnen"
                        className="py-2 px-3 text-sm font-bold rounded flex items-center justify-center bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-700 border border-red-200 transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                )}
            </div>
        </motion.div>
    );
}
