'use client';

import { ChangeEvent, FormEvent, useMemo, useState } from 'react';
import { Material } from '@/lib/types';

type RFQFormProps = {
  materials: Material[];
};

type RFQState = {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  projectName: string;
  quantity: string;
  timeline: string;
  process: string;
  selectedMaterial: string;
  notes: string;
  files: File[];
};

const defaultState: RFQState = {
  fullName: '',
  company: '',
  email: '',
  phone: '',
  projectName: '',
  quantity: '',
  timeline: '',
  process: '',
  selectedMaterial: '',
  notes: '',
  files: []
};

const steps = ['Contact', 'Project', 'Materials', 'Upload'];

export function RFQForm({ materials }: RFQFormProps) {
  const [step, setStep] = useState(0);
  const [formState, setFormState] = useState<RFQState>(defaultState);
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const selectedMaterial = useMemo(
    () => materials.find((material) => material.slug === formState.selectedMaterial),
    [materials, formState.selectedMaterial]
  );

  function updateField(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = event.target;
    setFormState((current) => ({ ...current, [name]: value }));
  }

  function updateFiles(event: ChangeEvent<HTMLInputElement>) {
    setFormState((current) => ({ ...current, files: Array.from(event.target.files ?? []) }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const formData = new FormData();
      Object.entries(formState).forEach(([key, value]) => {
        if (key === 'files') {
          return;
        }

        formData.append(key, String(value));
      });

      formState.files.forEach((file) => formData.append('files', file));

      const response = await fetch('/api/rfq', {
        method: 'POST',
        body: formData
      });

      const payload = (await response.json()) as { message: string };

      if (!response.ok) {
        throw new Error(payload.message);
      }

      setStatus(payload.message);
      setFormState(defaultState);
      setStep(0);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Unable to submit RFQ.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-card">
      <div className="mb-8 flex flex-wrap gap-3">
        {steps.map((label, index) => (
          <div
            key={label}
            className={`rounded-full px-4 py-2 text-sm font-medium ${
              index === step ? 'bg-brand-700 text-white' : 'bg-slate-100 text-slate-500'
            }`}
          >
            {index + 1}. {label}
          </div>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {step === 0 && (
          <>
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700">Full name</span>
              <input name="fullName" value={formState.fullName} onChange={updateField} required className="w-full rounded-2xl border border-slate-300 px-4 py-3" />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700">Company</span>
              <input name="company" value={formState.company} onChange={updateField} required className="w-full rounded-2xl border border-slate-300 px-4 py-3" />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700">Email</span>
              <input type="email" name="email" value={formState.email} onChange={updateField} required className="w-full rounded-2xl border border-slate-300 px-4 py-3" />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700">Phone</span>
              <input name="phone" value={formState.phone} onChange={updateField} className="w-full rounded-2xl border border-slate-300 px-4 py-3" />
            </label>
          </>
        )}

        {step === 1 && (
          <>
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700">Project name</span>
              <input name="projectName" value={formState.projectName} onChange={updateField} required className="w-full rounded-2xl border border-slate-300 px-4 py-3" />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700">Annual quantity</span>
              <input name="quantity" value={formState.quantity} onChange={updateField} required className="w-full rounded-2xl border border-slate-300 px-4 py-3" />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700">Timeline</span>
              <input name="timeline" value={formState.timeline} onChange={updateField} required className="w-full rounded-2xl border border-slate-300 px-4 py-3" />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700">Preferred process</span>
              <input name="process" value={formState.process} onChange={updateField} placeholder="Injection molding, CNC machining..." className="w-full rounded-2xl border border-slate-300 px-4 py-3" />
            </label>
          </>
        )}

        {step === 2 && (
          <>
            <label className="space-y-2 md:col-span-2">
              <span className="text-sm font-medium text-slate-700">Material selection</span>
              <select name="selectedMaterial" value={formState.selectedMaterial} onChange={updateField} required className="w-full rounded-2xl border border-slate-300 px-4 py-3">
                <option value="">Select a material</option>
                {materials.map((material) => (
                  <option key={material.slug} value={material.slug}>
                    {material.name} · Temp {material.temperatureResistance}°C · Strength {material.strength}/100
                  </option>
                ))}
              </select>
            </label>
            <label className="space-y-2 md:col-span-2">
              <span className="text-sm font-medium text-slate-700">Project notes</span>
              <textarea name="notes" value={formState.notes} onChange={updateField} rows={5} className="w-full rounded-2xl border border-slate-300 px-4 py-3" />
            </label>
            {selectedMaterial && (
              <div className="rounded-3xl bg-slate-100 p-4 text-sm text-slate-600 md:col-span-2">
                <p className="font-semibold text-slate-900">Selected material snapshot: {selectedMaterial.name}</p>
                <p className="mt-1">Density: {selectedMaterial.density} · Cost tier: {selectedMaterial.costRange} · Applications: {selectedMaterial.applications.join(', ')}</p>
              </div>
            )}
          </>
        )}

        {step === 3 && (
          <>
            <label className="space-y-2 md:col-span-2">
              <span className="text-sm font-medium text-slate-700">Upload STEP, STL, or drawings</span>
              <input type="file" multiple accept=".step,.stp,.stl,.pdf,.dwg,.dxf" onChange={updateFiles} className="w-full rounded-2xl border border-dashed border-slate-300 px-4 py-6" />
            </label>
            <div className="rounded-3xl bg-slate-100 p-4 text-sm text-slate-600 md:col-span-2">
              <p className="font-semibold text-slate-900">Attached files</p>
              <ul className="mt-2 space-y-1">
                {formState.files.length ? formState.files.map((file) => <li key={file.name}>{file.name}</li>) : <li>No files attached yet.</li>}
              </ul>
            </div>
          </>
        )}
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-3">
          <button type="button" onClick={() => setStep((current) => Math.max(current - 1, 0))} disabled={step === 0} className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 disabled:opacity-50">
            Back
          </button>
          {step < steps.length - 1 ? (
            <button type="button" onClick={() => setStep((current) => Math.min(current + 1, steps.length - 1))} className="rounded-full bg-brand-700 px-5 py-3 text-sm font-semibold text-white">
              Next step
            </button>
          ) : (
            <button type="submit" disabled={loading} className="rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white disabled:opacity-50">
              {loading ? 'Submitting...' : 'Submit RFQ'}
            </button>
          )}
        </div>
        {status && <p className="text-sm text-slate-600">{status}</p>}
      </div>
    </form>
  );
}
