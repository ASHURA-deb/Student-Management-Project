import { useEffect, useState } from "react";
import axios from "axios";
import StatsRing from "../Components/StatsRising";
import './StudentDashboard.css';
import {
  Container,
  Title,
  Loader,
  Center,
  Card,
  Avatar,
  Text,
  Badge,
  Stack,
  Button,
  Group,
  Box,
  Divider,
  ActionIcon,
  Paper,
  Notification,
  SimpleGrid,
} from "@mantine/core";
import { 
  IconLogout, 
  IconUser, 
  IconMail, 
  IconSchool, 
  IconCalendar,
  IconTrendingUp,
  IconSettings,
  IconBell,
  IconDashboard,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

export default function StudentDashboard() {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchStudent() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setLoading(false);
          return;
        }

        const res = await axios.get("http://localhost:5000/student/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setStudent(res.data);
      } catch (err) {
        console.error("Error fetching student:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchStudent();
  }, []);

  useEffect(() => {
    if (student?.id) {
      localStorage.setItem("student_id", student.id);
    }
  }, [student]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("student_id");
    navigate("/");
  };

  if (loading) {
    return (
      <Box className="loading-container">
        <Stack align="center" gap="lg">
          <Loader size="xl" className="custom-loader" />
          <Text size="lg" className="loading-text">Loading your dashboard...</Text>
        </Stack>
      </Box>
    );
  }

  if (!student) {
    return (
      <Container size="md" py="xl" className="dashboard-container">
        <Center style={{ height: "50vh" }}>
          <Notification 
            color="red" 
            title="Error" 
            withCloseButton={false}
            className="error-notification"
          >
            No student data found
          </Notification>
        </Center>
      </Container>
    );
  }

  // Enhanced stats with better calculations
  const studentStats = [
    {
      label: "Enrollment Year",
      stats: student.enrolment_year,
      progress: Math.min(((2024 - student.enrolment_year) / 4) * 100, 100),
      color: "var(--primary)",
    },
    {
      label: "Class",
      stats: student.class || "Not Assigned",
      progress: student.class ? 80 : 20,
      color: "var(--secondary)",
    },
    {
      label: "Status",
      stats: student.status,
      progress: student.status === "active" ? 100 : student.status === "graduated" ? 100 : 40,
      color: student.status === "active" ? "var(--accent)" : student.status === "graduated" ? "var(--primary)" : "#dc3545",
    },
  ];

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "var(--accent)";
      case "graduated":
        return "var(--primary)";
      case "suspended":
        return "#dc3545";
      default:
        return "var(--secondary)";
    }
  };

  const currentYear = new Date().getFullYear();
  const academicYear = currentYear - student.enrolment_year;

  return (
    <>
    <Box className="dashboard-container">
<Container style={{ maxWidth: "100%", width: "100%" }} py="xl">
        {/* Header Section - Centered */}
        <div className="dashboard-header">
          <Stack align="center" gap="lg" mb="xl">
            <Group gap="md" justify="center">
              <ActionIcon 
                size="xl" 
                radius="lg" 
                className="dashboard-icon"
              >
                <IconDashboard size={28} />
              </ActionIcon>
              <Stack gap="xs" align="center">
                <Title className="dashboard-title" ta="center">
                  Student Dashboard
                </Title>
                <Text className="welcome-text" ta="center">
                  Welcome back, {student.name?.split(" ")[0]}!
                </Text>
              </Stack>
            </Group>
            
            <Button
              leftSection={<IconLogout size={18} />}
              color="red"
              variant="light"
              radius="md"
              onClick={handleLogout}
              className="logout-btn"
            >
              Logout
            </Button>
          </Stack>
        </div>

        {/* Centered Content Stack */}
        <Stack align="center" gap="xl">
          {/* Profile Section - Centered */}
          <Card className="profile-card" w="100%" maw={450}>
            <Stack align="center" gap="lg">
              {/* Avatar with status indicator */}
              <Box pos="relative" className="avatar-container">
<img 
  src={student.photo || "https://via.placeholder.com/100"} 
  alt={student.name} 
  className="w-24 h-24 rounded-full object-cover"
/>



                {/* Status indicator */}
                <Box className="status-indicator" style={{ backgroundColor: getStatusColor(student.status) }} />
              </Box>

              {/* Student Info */}
              <Stack align="center" gap="sm">
                <Title order={2} className="student-name" ta="center">
                  {student.name}
                </Title>
                
                <Badge className="status-badge" style={{ backgroundColor: getStatusColor(student.status) }}>
                  {student.status}
                </Badge>
              </Stack>

              <Divider className="profile-divider" />

              {/* Contact Information - Centered */}
              <Stack gap="md" w="100%" align="center">
                <Group gap="md" className="info-row" justify="center">
                  <Text className="info-text" ta="center">{student.email}</Text>
                </Group>
                
                <Group gap="md" className="info-row" justify="center">
                  <IconSchool className="info-icon" />
                  <Text className="info-text" ta="center">
                    {student.department || "No department assigned"}
                  </Text>
                </Group>
                
                <Group gap="md" className="info-row" justify="center">
                  <IconCalendar className="info-icon" />
                  <Text className="info-text" ta="center">
                    Enrolled {student.enrolment_year}
                  </Text>
                </Group>
                
                {student.class && (
                  <Group gap="md" className="info-row" justify="center">
                    <IconUser className="info-icon" />
                    <Text className="info-text" ta="center">Class: {student.class}</Text>
                  </Group>
                )}
              </Stack>
            </Stack>
          </Card>

          {/* Quick Stats Cards - Centered */}
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg" w="100%" maw={800}>
            <Paper className="quick-stat-card academic-year">
              <Group gap="md" align="center" justify="center">
                <ActionIcon size="xl" className="stat-icon academic-icon">
                  <IconCalendar size={24} />
                </ActionIcon>
                <Stack gap="xs" align="center">
                  <Text className="stat-label" ta="center">Academic Year</Text>
                  <Text className="stat-value" ta="center">{academicYear} of 6</Text>
                  <Text className="stat-description" ta="center">Years completed</Text>
                </Stack>
              </Group>
            </Paper>

            <Paper className="quick-stat-card student-id">
              <Group gap="md" align="center" justify="center">
                <ActionIcon size="xl" className="stat-icon id-icon">
                  <IconUser size={24} />
                </ActionIcon>
                <Stack gap="xs" align="center">
                  <Text className="stat-label" ta="center">Student ID</Text>
                  <Text className="stat-value" ta="center">STU00{student.id || "N/A"}</Text>
                  <Text className="stat-description" ta="center">Your unique identifier</Text>
                </Stack>
              </Group>
            </Paper>
          </SimpleGrid>

          {/* Academic Progress - Centered */}
          <Card className="stats-card" w="100%" maw={800}>
            <Group gap="md" mb="lg" justify="center">
              <IconTrendingUp className="section-icon" />
              <Title order={3} className="section-title" ta="center">
                Academic Overview
              </Title>
            </Group>
            
<Box style={{ maxWidth: "100%", width: "100%" }} py="xl">

              <StatsRing data={studentStats}/>
            </Box>
          </Card>
        </Stack>
      </Container>
    </Box>

    {/* <a href={note.pdf_url} target="_blank" rel="noopener noreferrer">
  View PDF
</a> */}

    </>
  );
}