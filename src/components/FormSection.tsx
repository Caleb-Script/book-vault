import { Box, Field, Input, Text } from '@chakra-ui/react';

interface FormSectionProps {
  label: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  error?: string;
}

const FormSection: React.FC<FormSectionProps> = ({
  label,
  name,
  value,
  onChange,
  type = 'text',
  error,
}) => {
  return (
    <Box mb={4} position="relative">
      <Field.Root invalid={!!error}>
        <Input
          name={name}
          value={value}
          onChange={onChange}
          bg="gray.700"
          color="white"
          type={type}
          borderColor={error ? 'red.500' : 'gray.600'}
          _focus={{
            borderColor: error ? 'red.500' : 'blue.500',
            boxShadow: error ? '0 0 0 1px red' : '0 0 0 1px blue',
          }}
        />
        <Field.Label css={floatingStyles}>{label}</Field.Label>
      </Field.Root>
      {error && (
        <Text mt={1} fontSize="sm" color="red.500">
          {error}
        </Text>
      )}
    </Box>
  );
};

const floatingStyles = {
  position: 'absolute',
  backgroundColor: 'gray.800',
  paddingX: '0.5rem',
  top: '-0.75rem',
  left: '0.75rem',
  fontSize: 'sm',
  color: 'gray.400',
  pointerEvents: 'none',
  transition: 'all 0.2s',
  _peerPlaceholderShown: {
    top: '0.5rem',
    left: '0.75rem',
    fontSize: 'md',
    color: 'gray.600',
  },
  _peerFocus: {
    color: 'blue.400',
    top: '-0.75rem',
    left: '0.75rem',
    fontSize: 'sm',
  },
};

export default FormSection;
