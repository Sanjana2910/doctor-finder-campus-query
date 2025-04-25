
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Doctor } from "../types/doctor";

interface DoctorCardProps {
  doctor: Doctor;
}

export const DoctorCard = ({ doctor }: DoctorCardProps) => {
  // Ensure all data is available before rendering
  if (!doctor) {
    return null;
  }

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2">
        <h3 className="text-xl font-semibold">{doctor.name || 'Unknown Doctor'}</h3>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="text-sm text-gray-600">
          <span className="font-medium">Specialties:</span>{" "}
          {doctor.specialities && doctor.specialities.length > 0
            ? doctor.specialities.map(specialty => specialty.name).join(", ")
            : "Not specified"}
        </div>
        <div className="text-sm text-gray-600">
          <span className="font-medium">Experience:</span> {doctor.experience || 0} years
        </div>
        <div className="text-sm text-gray-600">
          <span className="font-medium">Consultation Types:</span>{" "}
          {doctor.consultationType?.join(", ") || "Not specified"}
        </div>
        <div className="text-sm font-semibold text-blue-600">
          Fees: ₹{doctor.fees || 0}
        </div>
      </CardContent>
    </Card>
  );
};
