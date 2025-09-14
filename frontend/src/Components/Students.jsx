import { useState, useMemo } from "react";
import Navbar from "./Navbar";
import "../Styles/Students.css"; // import the normal CSS

export default function Students({ students }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [filterStatus, setFilterStatus] = useState("All");

  // Filter students based on search and status
  const filteredStudents = useMemo(() => {
    const lowerSearch = searchTerm.toLowerCase();
    return students.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(lowerSearch) ||
        student.class.toLowerCase().includes(lowerSearch) ||
        student.student_id.toLowerCase().includes(lowerSearch);

      const matchesStatus =
        filterStatus === "All" || student.status === filterStatus;

      return matchesSearch && matchesStatus;
    });
  }, [students, searchTerm, filterStatus]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "border-green-200 bg-green-100 text-green-800";
      case "Inactive":
        return "border-red-200 bg-red-100 text-red-800";
      case "Graduated":
        return "border-blue-200 bg-blue-100 text-blue-800";
      default:
        return "border-gray-200 bg-gray-100 text-gray-800";
    }
  };

  const statusCounts = useMemo(() => {
    return students.reduce((acc, student) => {
      acc[student.status] = (acc[student.status] || 0) + 1;
      return acc;
    }, {});
  }, [students]);

  return (
    <>
      <Navbar />
      <div className="container">
        <h1 className="headerTitle">Student Management</h1>
        <p className="headerSubtitle">
          Manage and track all your students in one place
        </p>

        {/* Stats */}
        <div className="statsWrapper">
          <div className="statsCard">
            <div className="statsNumber statsTotal">{students.length}</div>
            <div className="statsLabel">Total Students</div>
          </div>
          <div className="statsCard">
            <div className="statsNumber statsActive">{statusCounts.Active || 0}</div>
            <div className="statsLabel">Active</div>
          </div>
          <div className="statsCard">
            <div className="statsNumber statsGraduated">{statusCounts.Graduated || 0}</div>
            <div className="statsLabel">Graduated</div>
          </div>
          <div className="statsCard">
            <div className="statsNumber statsInactive">{statusCounts.Inactive || 0}</div>
            <div className="statsLabel">Inactive</div>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="searchWrapper">
          <div className="searchInner">
            <div className="searchInputWrapper">
              <div className="searchIcon">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search by name, class, or student ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="searchInput"
              />
            </div>
            <div className="filterSelectWrapper">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="filterSelect"
              >
                <option value="All">All Status</option>
                <option value="Active">Active Only</option>
                <option value="Inactive">Inactive Only</option>
                <option value="Graduated">Graduated Only</option>
              </select>
            </div>
          </div>
        </div>

        {/* Students Grid */}
        {filteredStudents.length === 0 ? (
          <div className="emptyWrapper">
            <div className="emptyIcon">🔍</div>
            <h3 className="emptyTitle">No students found</h3>
            <p className="emptyDesc">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="gridWrapper">
            {filteredStudents.map((student) => (
              <div
                key={student.id}
                className="studentCard"
                onClick={() => setSelectedStudent(student)}
              >
                <div className="studentHeader">
                  <div className="studentAvatar">
                    {student.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="studentNameWrapper">
                    <h3 className="studentName">{student.name}</h3>
                    <p className="studentId">{student.student_id}</p>
                  </div>
                </div>

                <div className="studentInfo">
                  <div className="studentInfoRow">
                    <span className="studentInfoLabel">Class:</span>
                    <span className="studentInfoValue">{student.class}</span>
                  </div>
                  <div className="studentInfoRow">
                    <span className="studentInfoLabel">Status:</span>
                    <span
                      className={`studentStatusBadge ${getStatusColor(student.status)}`}
                    >
                      {student.status}
                    </span>
                  </div>
                  <div className="studentInfoRow">
                    <span className="studentInfoLabel">Enrolled:</span>
                    <span className="studentInfoValue">{student.enrolment_year}</span>
                  </div>
                </div>

                <div className="studentFooter">View Details →</div>
              </div>
            ))}
          </div>
        )}

        {/* Modal */}
        {selectedStudent && (
          <div className="modalOverlay">
            <div className="modalContainer">
              <div className="modalHeader">
                <div className="flex items-center">
                  <div className="modalAvatar">
                    {selectedStudent.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h2 className="modalTitle">{selectedStudent.name}</h2>
                    <p className="modalSubTitle">{selectedStudent.student_id}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedStudent(null)}
                  className="modalCloseButton"
                >
                  ✕
                </button>
              </div>

              <div className="modalContent">
                {/* Personal Info */}
                <div>
                  <h3 className="modalSectionTitle">Personal Information</h3>
                  <div className="space-y-3">
                    <div className="modalInfoRow">
                      <span className="modalInfoLabel">Full Name:</span>
                      <span className="modalInfoValue">{selectedStudent.name}</span>
                    </div>
                    <div className="modalInfoRow">
                      <span className="modalInfoLabel">Date of Birth:</span>
                      <span className="modalInfoValue">{selectedStudent.dob}</span>
                    </div>
                    <div className="modalInfoRow">
                      <span className="modalInfoLabel">Nationality:</span>
                      <span className="modalInfoValue">{selectedStudent.nationality}</span>
                    </div>
                    <div className="modalInfoRow">
                      <span className="modalInfoLabel">Languages:</span>
                      <span className="modalInfoValue">{selectedStudent.languages}</span>
                    </div>
                  </div>
                </div>

                {/* Academic Info */}
                <div>
                  <h3 className="modalSectionTitle">Academic Information</h3>
                  <div className="space-y-3">
                    <div className="modalInfoRow">
                      <span className="modalInfoLabel">Student ID:</span>
                      <span className="modalInfoValueMono">{selectedStudent.student_id}</span>
                    </div>
                    <div className="modalInfoRow">
                      <span className="modalInfoLabel">Class:</span>
                      <span className="modalInfoValue">{selectedStudent.class}</span>
                    </div>
                    <div className="modalInfoRow">
                      <span className="modalInfoLabel">Enrolment Year:</span>
                      <span className="modalInfoValue">{selectedStudent.enrolment_year}</span>
                    </div>
                    <div className="modalInfoRow">
                      <span className="modalInfoLabel">Status:</span>
                      <span
                        className={`studentStatusBadge ${getStatusColor(
                          selectedStudent.status
                        )}`}
                      >
                        {selectedStudent.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="modalActions">
                <button
                  onClick={() => setSelectedStudent(null)}
                  className="modalCloseButton"
                >
                  Close
                </button>
                <button className="modalEditButton">Edit Student</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
