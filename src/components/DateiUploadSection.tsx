import { Box, Input, Text } from '@chakra-ui/react';

interface DateiUploadSectionProps {
  onFileUpload: (file: File) => void;
}

const DateiUploadSection: React.FC<DateiUploadSectionProps> = ({
  onFileUpload,
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileUpload(file);
    }
  };

  return (
    <Box mb={4}>
      <Text mb={2}>Datei hochladen</Text>
      <Input
        type="file"
        onChange={handleFileChange}
        bg="gray.700"
        color="white"
      />
    </Box>
  );
};

export default DateiUploadSection;
