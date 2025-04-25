
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";

interface FiltersProps {
  specialties: string[];
  selectedSpecialties: string[];
  consultationType: string;
  sortBy: string;
  onSpecialtyChange: (specialty: string) => void;
  onConsultationTypeChange: (type: string) => void;
  onSortChange: (value: string) => void;
}

export const Filters = ({
  specialties,
  selectedSpecialties,
  consultationType,
  sortBy,
  onSpecialtyChange,
  onConsultationTypeChange,
  onSortChange,
}: FiltersProps) => {
  return (
    <Card className="p-6 space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Consultation Type</h3>
        <RadioGroup
          value={consultationType}
          onValueChange={onConsultationTypeChange}
          className="space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Video Consult" id="video" />
            <Label htmlFor="video">Video Consult</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="In Clinic" id="clinic" />
            <Label htmlFor="clinic">In Clinic</Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Specialties</h3>
        <div className="space-y-2">
          {specialties.map((specialty) => (
            <div key={specialty} className="flex items-center space-x-2">
              <Checkbox
                id={specialty}
                checked={selectedSpecialties.includes(specialty)}
                onCheckedChange={() => onSpecialtyChange(specialty)}
              />
              <Label htmlFor={specialty}>{specialty}</Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Sort By</h3>
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Sort by..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="fees-asc">Fees: Low to High</SelectItem>
            <SelectItem value="experience-desc">Experience: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </Card>
  );
};
