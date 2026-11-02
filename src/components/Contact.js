import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { Paperclip, X, CheckCircle2, AlertCircle, Loader2, MessageCircle, Mail, Phone, MapPin } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';
import Button from './ui/Button';
import { brand, contact } from '../content/site';

// EmailJS wiring — unchanged from the previous site so the existing template keeps working.
const EMAILJS = {
    serviceId: 'service_4ozoind',
    templateId: 'template_hgfjmom',
    publicKey: '9DJE0hcQWe_YGU103',
};

const MAX_FILES = 5;
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const ACCEPT = '.jpg,.jpeg,.png,.gif,.webp,.pdf,.psd,.cdr,.ai,.eps,.svg';

const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });

const fmtSize = (bytes) => (bytes < 1024 * 1024 ? `${Math.round(bytes / 1024)} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const initial = { name: '', company: '', email: '', phone: '', service: '', quantity: '', deadline: '', message: '' };

export default function Contact() {
    const [form, setForm] = useState(initial);
    const [files, setFiles] = useState([]);
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState({ state: 'idle', message: '' });
    const [dragging, setDragging] = useState(false);
    const fileInput = useRef(null);

    const set = (k) => (e) => {
        setForm((f) => ({ ...f, [k]: e.target.value }));
        if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
    };

    const validate = () => {
        const er = {};
        if (!form.name.trim()) er.name = 'Please enter your name.';
        if (!form.email.trim()) er.email = 'Please enter your email.';
        else if (!EMAIL_RE.test(form.email)) er.email = 'That email address doesn’t look right.';
        if (!form.service) er.service = 'Choose the service you need.';
        if (!form.message.trim()) er.message = 'Tell us a little about the job.';
        setErrors(er);
        return Object.keys(er).length === 0;
    };

    const addFiles = (list) => {
        const incoming = Array.from(list);
        const problems = [];
        const ok = [];
        for (const f of incoming) {
            if (f.size > MAX_FILE_SIZE) { problems.push(`${f.name} is over 10 MB`); continue; }
            if (files.length + ok.length >= MAX_FILES) { problems.push(`Maximum ${MAX_FILES} files`); break; }
            ok.push({ id: `${f.name}-${f.size}-${Date.now()}`, file: f, name: f.name, size: f.size });
        }
        if (ok.length) setFiles((prev) => [...prev, ...ok]);
        if (problems.length) setStatus({ state: 'error', message: problems.join(' · ') });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (status.state === 'submitting') return;
        if (!validate()) {
            const first = document.querySelector('[aria-invalid="true"]');
            first?.focus();
            return;
        }
        setStatus({ state: 'submitting', message: 'Sending your request…' });

        try {
            const details = [
                form.company && `Company: ${form.company}`,
                form.phone && `Phone: ${form.phone}`,
                form.quantity && `Quantity: ${form.quantity}`,
                form.deadline && `Deadline: ${form.deadline}`,
            ].filter(Boolean).join('\n');

            const params = {
                to_email: brand.email,
                from_name: form.name,
                reply_to: form.email,
                service: form.service,
                subject: `Quote request — ${form.service}${form.company ? ` — ${form.company}` : ''}`,
                message: details ? `${details}\n\n${form.message}` : form.message,
                // Extra fields, available if the EmailJS template is updated to show them
                company: form.company,
                phone: form.phone,
                quantity: form.quantity,
                deadline: form.deadline,
                attachments_info: files.length
                    ? `<ul style="margin:0;padding-left:18px;">${files.map((f) => `<li>${f.name} (${fmtSize(f.size)})</li>`).join('')}</ul>`
                    : 'No attachments included',
                time: new Date().toLocaleString(),
            };

            for (let i = 0; i < files.length; i++) {
                try {
                    params[`attachment_${i + 1}`] = await fileToBase64(files[i].file);
                    params[`attachment_${i + 1}_name`] = files[i].name;
                } catch (err) {
                    console.error('Could not read attachment', files[i].name, err);
                }
            }

            await emailjs.send(EMAILJS.serviceId, EMAILJS.templateId, params, EMAILJS.publicKey);
            setStatus({ state: 'success', message: 'Thanks — your request is in. We’ll reply within one working day.' });
            setForm(initial);
            setFiles([]);
        } catch (err) {
            console.error('EmailJS error', err);
            setStatus({
                state: 'error',
                message: 'Something went wrong sending the form. Please try again, or message us on WhatsApp.',
            });
        }
    };

    const field = (label, key, props = {}, as = 'input') => {
        const Tag = as;
        const id = `contact-${key}`;
        const err = errors[key];
        return (
            <div className={props.full ? 'sm:col-span-2' : ''}>
                <label htmlFor={id} className="block font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink-muted">
                    {label}{props.required && <span className="text-red"> *</span>}
                </label>
                <Tag
                    id={id}
                    value={form[key]}
                    onChange={set(key)}
                    aria-invalid={err ? 'true' : undefined}
                    aria-describedby={err ? `${id}-error` : undefined}
                    className={`mt-2 block w-full rounded-[4px] border bg-white px-4 py-3 text-[15px] text-ink placeholder:text-ink/35 transition-colors focus:border-ink focus:outline-none ${
                        err ? 'border-red' : 'border-line'
                    } ${as === 'textarea' ? 'min-h-[140px] resize-y' : 'min-h-[48px]'}`}
                    {...props}
                    full={undefined}
                />
                {err && (
                    <p id={`${id}-error`} className="mt-1.5 flex items-center gap-1.5 text-[13px] text-red-deep" role="alert">
                        <AlertCircle size={13} aria-hidden="true" /> {err}
                    </p>
                )}
            </div>
        );
    };

    return (
        <section id="contact" className="border-t border-line bg-paper-2/40">
            <div className="mx-auto grid max-w-shell grid-cols-1 gap-12 px-5 py-20 md:px-8 md:py-28 lg:grid-cols-12 lg:gap-16">
                <div className="lg:col-span-5">
                    <SectionHeading index="06" eyebrow={contact.eyebrow} heading={contact.heading} intro={contact.lede} />

                    <Reveal delay={0.2}>
                        <ul className="mt-10 space-y-4 border-t border-line pt-8">
                            <li>
                                <a href={brand.whatsappHref} target="_blank" rel="noreferrer" className="group flex items-center gap-4">
                                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-ink text-paper transition-colors group-hover:bg-red">
                                        <MessageCircle size={18} aria-hidden="true" />
                                    </span>
                                    <span>
                                        <span className="block font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink-muted">WhatsApp — fastest</span>
                                        <span className="block text-[16px] font-medium text-ink">{brand.whatsapp}</span>
                                    </span>
                                </a>
                            </li>
                            <li>
                                <a href={brand.phoneHref} className="group flex items-center gap-4">
                                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition-colors group-hover:border-ink">
                                        <Phone size={18} aria-hidden="true" />
                                    </span>
                                    <span>
                                        <span className="block font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink-muted">Call</span>
                                        <span className="block text-[16px] font-medium text-ink">{brand.phone}</span>
                                    </span>
                                </a>
                            </li>
                            <li>
                                <a href={`mailto:${brand.email}`} className="group flex items-center gap-4">
                                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition-colors group-hover:border-ink">
                                        <Mail size={18} aria-hidden="true" />
                                    </span>
                                    <span>
                                        <span className="block font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink-muted">Email</span>
                                        <span className="block text-[16px] font-medium text-ink">{brand.email}</span>
                                    </span>
                                </a>
                            </li>
                            <li className="flex items-center gap-4">
                                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink">
                                    <MapPin size={18} aria-hidden="true" />
                                </span>
                                <span>
                                    <span className="block font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink-muted">Studio</span>
                                    <span className="block text-[16px] font-medium text-ink">{brand.city} · {brand.hours}</span>
                                </span>
                            </li>
                        </ul>
                    </Reveal>
                </div>

                <Reveal className="lg:col-span-7" delay={0.15}>
                    <form onSubmit={onSubmit} noValidate className="rounded-[6px] border border-line bg-paper p-6 shadow-card md:p-8">
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                            {field('Your name', 'name', { required: true, autoComplete: 'name', placeholder: 'Nimal Perera' })}
                            {field('Company', 'company', { autoComplete: 'organization', placeholder: 'Company or event' })}
                            {field('Email', 'email', { required: true, type: 'email', autoComplete: 'email', placeholder: 'you@company.lk' })}
                            {field('Phone / WhatsApp', 'phone', { type: 'tel', autoComplete: 'tel', placeholder: '+94 7X XXX XXXX' })}

                            <div>
                                <label htmlFor="contact-service" className="block font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink-muted">
                                    Service<span className="text-red"> *</span>
                                </label>
                                <select
                                    id="contact-service"
                                    value={form.service}
                                    onChange={set('service')}
                                    aria-invalid={errors.service ? 'true' : undefined}
                                    aria-describedby={errors.service ? 'contact-service-error' : undefined}
                                    className={`mt-2 block min-h-[48px] w-full rounded-[4px] border bg-white px-4 py-3 text-[15px] text-ink focus:border-ink focus:outline-none ${
                                        errors.service ? 'border-red' : 'border-line'
                                    }`}
                                >
                                    <option value="">Select a service</option>
                                    {contact.serviceOptions.map((s) => <option key={s} value={s}>{s}</option>)}
                                </select>
                                {errors.service && (
                                    <p id="contact-service-error" className="mt-1.5 flex items-center gap-1.5 text-[13px] text-red-deep" role="alert">
                                        <AlertCircle size={13} aria-hidden="true" /> {errors.service}
                                    </p>
                                )}
                            </div>

                            {field('Quantity', 'quantity', { placeholder: 'e.g. 12 flags, 200 tees' })}
                            {field('Needed by', 'deadline', { type: 'date', full: true })}
                            {field('Job details', 'message', { required: true, full: true, placeholder: 'Sizes, materials, colours, where it will be used…' }, 'textarea')}
                        </div>

                        {/* Attachments */}
                        <div className="mt-6">
                            <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink-muted">
                                Artwork <span className="text-ink/40">(optional · up to {MAX_FILES} files, 10 MB each)</span>
                            </p>
                            <div
                                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                                onDragLeave={() => setDragging(false)}
                                onDrop={(e) => { e.preventDefault(); setDragging(false); addFiles(e.dataTransfer.files); }}
                                className={`mt-2 rounded-[4px] border border-dashed p-4 transition-colors ${dragging ? 'border-red bg-red-tint' : 'border-line bg-white'}`}
                            >
                                <input
                                    ref={fileInput}
                                    type="file"
                                    multiple
                                    accept={ACCEPT}
                                    className="sr-only"
                                    id="contact-files"
                                    onChange={(e) => { addFiles(e.target.files); e.target.value = ''; }}
                                />
                                <div className="flex flex-wrap items-center justify-between gap-3">
                                    <label htmlFor="contact-files" className="inline-flex min-h-[44px] cursor-pointer items-center gap-2 text-[14px] font-medium text-ink underline decoration-red decoration-2 underline-offset-4">
                                        <Paperclip size={16} aria-hidden="true" />
                                        Attach files
                                    </label>
                                    <span className="text-[13px] text-ink-muted">or drop them here — AI, PDF, PNG, JPG, PSD, CDR</span>
                                </div>
                                {files.length > 0 && (
                                    <ul className="mt-3 divide-y divide-line border-t border-line">
                                        {files.map((f) => (
                                            <li key={f.id} className="flex items-center justify-between gap-3 py-2 text-[14px]">
                                                <span className="truncate text-ink">{f.name} <span className="text-ink-muted">· {fmtSize(f.size)}</span></span>
                                                <button
                                                    type="button"
                                                    onClick={() => setFiles((prev) => prev.filter((x) => x.id !== f.id))}
                                                    className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-ink-muted hover:bg-paper-2 hover:text-ink"
                                                    aria-label={`Remove ${f.name}`}
                                                >
                                                    <X size={14} />
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>

                        <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <Button as="button" type="submit" variant="red" arrow className="w-full sm:w-auto" disabled={status.state === 'submitting'}>
                                {status.state === 'submitting' ? (
                                    <span className="inline-flex items-center gap-2"><Loader2 size={16} className="animate-spin" aria-hidden="true" /> Sending</span>
                                ) : 'Send quote request'}
                            </Button>
                            <p className="text-[13px] text-ink-muted">No spam. We reply by email or WhatsApp.</p>
                        </div>

                        <div aria-live="polite" className="min-h-[1.5rem]">
                            {status.state === 'success' && (
                                <p className="mt-4 flex items-start gap-2 rounded-[4px] bg-green-50 px-4 py-3 text-[14px] text-green-800">
                                    <CheckCircle2 size={16} className="mt-[2px] shrink-0" aria-hidden="true" /> {status.message}
                                </p>
                            )}
                            {status.state === 'error' && (
                                <p className="mt-4 flex items-start gap-2 rounded-[4px] bg-red-tint px-4 py-3 text-[14px] text-red-deep">
                                    <AlertCircle size={16} className="mt-[2px] shrink-0" aria-hidden="true" /> {status.message}
                                </p>
                            )}
                        </div>
                    </form>
                </Reveal>
            </div>
        </section>
    );
}
