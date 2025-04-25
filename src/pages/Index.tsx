
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Doctor } from "../types/doctor";
import { fetchDoctors } from "../services/api";
import { SearchBar } from "../components/SearchBar";
import { Filters } from "../components/Filters";
import { DoctorCard } from "../components/DoctorCard";

const Index = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>(
    searchParams.get("specialties")?.split(",").filter(Boolean) || []
  );
  const [consultationType, setConsultationType] = useState(
    searchParams.get("consultationType") || ""
  );
  const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "");

  const { data: doctors = [] } = useQuery({
    queryKey: ["doctors"],
    queryFn: fetchDoctors,
  });

  const getAllSpecialties = (doctors: Doctor[]) => {
    const specialtiesSet = new Set<string>();
    doctors.forEach((doctor) =>
      doctor.specialities.forEach((specialty) => specialtiesSet.add(specialty))
    );
    return Array.from(specialtiesSet);
  };

  useEffect(() => {
    let filtered = [...doctors];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter((doctor) =>
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply specialty filters
    if (selectedSpecialties.length > 0) {
      filtered = filtered.filter((doctor) =>
        doctor.specialities.some((specialty) =>
          selectedSpecialties.includes(specialty)
        )
      );
    }

    // Apply consultation type filter
    if (consultationType) {
      filtered = filtered.filter((doctor) =>
        doctor.consultationType.includes(consultationType)
      );
    }

    // Apply sorting
    if (sortBy) {
      filtered.sort((a, b) => {
        if (sortBy === "fees-asc") {
          return a.fees - b.fees;
        }
        if (sortBy === "experience-desc") {
          return b.experience - a.experience;
        }
        return 0;
      });
    }

    setFilteredDoctors(filtered);

    // Update URL params
    const params = new URLSearchParams();
    if (searchQuery) params.set("search", searchQuery);
    if (selectedSpecialties.length > 0)
      params.set("specialties", selectedSpecialties.join(","));
    if (consultationType) params.set("consultationType", consultationType);
    if (sortBy) params.set("sortBy", sortBy);
    setSearchParams(params);
  }, [doctors, searchQuery, selectedSpecialties, consultationType, sortBy]);

  const handleSpecialtyChange = (specialty: string) => {
    setSelectedSpecialties((prev) =>
      prev.includes(specialty)
        ? prev.filter((s) => s !== specialty)
        : [...prev, specialty]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Find Doctors</h1>
          <SearchBar doctors={doctors} onSearch={setSearchQuery} />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <aside>
            <Filters
              specialties={getAllSpecialties(doctors)}
              selectedSpecialties={selectedSpecialties}
              consultationType={consultationType}
              sortBy={sortBy}
              onSpecialtyChange={handleSpecialtyChange}
              onConsultationTypeChange={setConsultationType}
              onSortChange={setSortBy}
            />
          </aside>
          <div className="md:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDoctors.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))}
            </div>
            {filteredDoctors.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No doctors found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
