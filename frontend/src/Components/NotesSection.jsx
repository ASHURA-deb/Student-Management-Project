import { Paper, Button, Group, Text, Image, Stack, Container } from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";
import pdf from "../assets/College Event Management_Website Design and Development-SRS_final.pdf";

// A sample thumbnail (you can replace with an auto-generated preview later)
import pdfThumbnail from "../assets/image.png";

function NotesSection() {
  return (
    <Container size="sm" className="py-10">
      <h3 className="text-3xl font-bold mb-8 text-center text-gray-800">
        📚 My Notes
      </h3>

      <Paper
        withBorder
        shadow="md"
        radius="md"
        p="lg"
        className="transition-transform hover:scale-[1.02] hover:shadow-lg mx-auto"
        style={{ maxWidth: 600 }}
      >
        <Group align="flex-start" spacing="lg" position="apart">
          {/* Thumbnail */}
          <Image
            src={pdfThumbnail}
            alt="PDF Thumbnail"
            width={90}
            height={110}
            radius="sm"
            fit="cover"
            withPlaceholder
          />

          {/* Note Info */}
          <Stack spacing="xs" style={{ flex: 1 }}>
            <Text fw={600} size="lg">
              Sample Notes
            </Text>
            <Text size="sm" c="dimmed">
              College Event Management – SRS Document
            </Text>
          </Stack>

          {/* Download Button */}
          <Button
            component="a"
            href={pdf}
            target="_blank"
            rel="noopener noreferrer"
            leftSection={<IconDownload size={16} />}
            color="teal"
          >
            Download
          </Button>
        </Group>
      </Paper>
    </Container>
  );
}

export default NotesSection;
