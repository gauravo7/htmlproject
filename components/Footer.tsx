export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-300">
      <div className="container-shell grid gap-6 py-10 md:grid-cols-3">
        <div>
          <p className="text-lg font-semibold text-white">Polymer Connection</p>
          <p className="mt-2 text-sm text-slate-400">
            Headless manufacturing intelligence platform connecting polymer process content, structured RFQs, and CRM-ready lead capture.
          </p>
        </div>
        <div>
          <p className="font-medium text-white">Capabilities</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-400">
            <li>Headless WordPress + WPGraphQL</li>
            <li>Structured material and process relationships</li>
            <li>Monday.com-integrated RFQ pipeline</li>
          </ul>
        </div>
        <div>
          <p className="font-medium text-white">Deployment</p>
          <p className="mt-3 text-sm text-slate-400">Ready for Vercel, self-hosted Node, or containerized deployments with ISR enabled.</p>
        </div>
      </div>
    </footer>
  );
}
