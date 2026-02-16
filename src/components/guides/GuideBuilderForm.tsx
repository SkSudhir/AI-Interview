'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '../ui/Card';
import { Input, TextArea, Select } from '../ui/Input';
import { Button } from '../ui/Button';
import { Upload } from 'lucide-react';

interface GuideFormData {
    title: string;
    jobFamily: string;
    role: string;
    level: string;
    jobDescription: string;
}

interface GuideBuilderFormProps {
    onSubmit: (data: GuideFormData) => Promise<void>;
}

const JOB_FAMILIES = [
    { value: '', label: 'Select Job Family' },
    { value: 'engineering', label: 'Engineering' },
    { value: 'product', label: 'Product Management' },
    { value: 'design', label: 'Design' },
    { value: 'sales', label: 'Sales' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'operations', label: 'Operations' },
    { value: 'finance', label: 'Finance' },
    { value: 'hr', label: 'Human Resources' },
];

const LEVELS = [
    { value: '', label: 'Select Level' },
    { value: 'volume', label: 'Volume' },
    { value: 'professional', label: 'Professional' },
    { value: 'managerial', label: 'Managerial' },
    { value: 'executive', label: 'Executive' },
];

export function GuideBuilderForm({ onSubmit }: GuideBuilderFormProps) {
    const [formData, setFormData] = useState<GuideFormData>({
        title: '',
        jobFamily: '',
        role: '',
        level: '',
        jobDescription: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await onSubmit(formData);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Card>
                <CardHeader>
                    <h2 className="text-2xl font-bold text-gray-900">Create Interview Guide</h2>
                    <p className="text-sm text-gray-600 mt-1">
                        Define the role and let AI generate relevant skills and questions
                    </p>
                </CardHeader>

                <CardContent className="space-y-6">
                    <Input
                        label="Guide Title *"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="e.g., Senior Software Engineer Interview"
                        required
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Select
                            label="Job Family"
                            name="jobFamily"
                            value={formData.jobFamily}
                            onChange={handleChange}
                            options={JOB_FAMILIES}
                        />

                        <Input
                            label="Role"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            placeholder="e.g., Software Engineer"
                        />

                        <Select
                            label="Level"
                            name="level"
                            value={formData.level}
                            onChange={handleChange}
                            options={LEVELS}
                        />
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                        <div className="flex items-center justify-between mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Job Description (Optional)
                            </label>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="flex items-center gap-2"
                            >
                                <Upload size={16} />
                                Upload PDF
                            </Button>
                        </div>
                        <TextArea
                            name="jobDescription"
                            value={formData.jobDescription}
                            onChange={handleChange}
                            placeholder="Paste job description here or upload a PDF..."
                            rows={8}
                        />
                    </div>
                </CardContent>

                <CardFooter className="flex justify-end gap-3">
                    <Button type="button" variant="outline">
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting || !formData.title}>
                        {isSubmitting ? 'Generating Skills...' : 'Generate Skills'}
                    </Button>
                </CardFooter>
            </Card>
        </form>
    );
}
