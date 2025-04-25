
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Doctor } from "../types/doctor";

interface DoctorCardProps {
  doctor: Doctor;
}

export const DoctorCard = ({ doctor }: DoctorCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2">
        <h3 className="text-xl font-semibold">{doctor.name}</h3>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="text-sm text-gray-600">
          <span className="font-medium">Specialties:</span>{" "}
          {doctor.specialities.map(specialty => specialty.name).join(", ")}
        </div>
        <div className="text-sm text-gray-600">
          <span className="font-medium">Experience:</span> {doctor.experience} years
        </div>
        <div className="text-sm text-gray-600">
          <span className="font-medium">Consultation Types:</span>{" "}
          {doctor.consultationType?.join(", ") || "Not specified"}
        </div>
        <div className="text-sm font-semibold text-blue-600">
          Fees: ₹{doctor.fees}
        </div>
      </CardContent>
    </Card>
  );
};
