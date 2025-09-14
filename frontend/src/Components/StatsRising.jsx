// src/components/StatsGrid.jsx
import {
  IconCalendarEvent,
  IconSchool,
  IconTarget,
  IconTrendingUp,
} from "@tabler/icons-react";
import { Group, Paper, Text, Badge, Box, ThemeIcon } from "@mantine/core";
import classes from "./StatsRising.module.css";

const icons = {
  "Enrollment Year": IconCalendarEvent,
  "Class": IconSchool,
  "Academic Status": IconTarget,
  default: IconTrendingUp,
};

const getIconColor = (label) => {
  switch (label) {
    case "Enrollment Year":
      return "var(--primary)";
    case "Class":
      return "var(--secondary)";
    case "Academic Status":
      return "var(--accent)";
    default:
      return "var(--primary)";
  }
};

export default function StatsRising({ data }) {
  const stats = data.map((stat) => {
    const Icon = icons[stat.label] || icons.default;
    const iconColor = getIconColor(stat.label);

    return (
      <Paper 
        withBorder 
        p="xl" 
        radius="lg" 
        key={stat.label}
        className={classes.statCard}
        shadow="xs"
      >
        {/* Enhanced Header with colored icon background */}
        <Group justify="space-between" mb="md">
          <Text 
            size="sm" 
            fw={600}
            c="dimmed" 
            className={classes.title}
            tt="uppercase"
            ls={0.5}
          >
            {stat.label}
          </Text>
          <ThemeIcon
            size={44}
            radius="xl"
            variant="light"
            style={{
              backgroundColor: `${iconColor}15`,
              color: iconColor,
              border: `2px solid ${iconColor}25`
            }}
          >
            <Icon size={24} stroke={1.5} />
          </ThemeIcon>
        </Group>

        {/* Enhanced Value Section */}
        <Box mb="md">
          <Group align="flex-end" gap="sm">
            <Text 
              className={classes.value} 
              size="xl" 
              fw={700}
              style={{ 
                color: 'var(--text)',
                lineHeight: 1.1 
              }}
            >
              {stat.stats}
            </Text>
            {/* {stat.progress !== undefined && (
              <Box className={classes.progressContainer}>
                <Text
                  c={stat.progress >= 50 ? "teal" : "red"}
                  size="sm"
                  fw={600}
                  className={classes.progressText}
                >
                  {stat.progress > 0 ? '+' : ''}{stat.progress}%
                </Text>
              </Box>
            )} */}
          </Group>
        </Box>

        {/* Enhanced Status/Description Section */}
        {stat.label === "Academic Status" ? (
          <Badge
            size="lg"
            color={
              stat.stats === "active" 
                ? "teal" 
                : stat.stats === "graduated" 
                ? "violet" 
                : "red"
            }
            variant="gradient"
            gradient={
              stat.stats === "active"
                ? { from: 'teal', to: 'green' }
                : stat.stats === "graduated"
                ? { from: 'violet', to: 'purple' }
                : { from: 'red', to: 'orange' }
            }
            radius="md"
            className={classes.statusBadge}
          >
            {stat.stats === "active"
              ? "✓ Active Student"
              : stat.stats === "graduated"
              ? "🎓 Graduated"
              : "⚠ Inactive"}
          </Badge>
        ) : (
          <Text 
            size="xs" 
            c="dimmed" 
            className={classes.description}
            style={{ opacity: 0.7 }}
          >
            {stat.description || "Latest student data"}
          </Text>
        )}

        {/* Subtle accent line */}
        <Box 
          className={classes.accentLine}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 3,
            background: `linear-gradient(90deg, ${iconColor}, transparent)`,
            borderRadius: '0 0 12px 12px'
          }}
        />
      </Paper>
    );
  });

  return (
  <div className={classes.root} style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
    {stats}
  </div>

  );
}