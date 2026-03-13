"use client";

import { motion } from "framer-motion";

const nodeBase = "rounded-lg border px-4 py-3 text-xs font-medium shadow-sm";

const destinations = [
  { label: "Hospital Profile | Execut...", detail: "25% / 10.2k views", color: "bg-green-100 border-green-300 text-green-900" },
  { label: "Hospitals Profile | Affili...", detail: "", color: "bg-green-100 border-green-300 text-green-900" },
  { label: "No Next Step", detail: "", color: "bg-gray-100 border-gray-300 text-gray-700" },
  { label: "All Products | Quick Se...", detail: "", color: "bg-red-100 border-red-300 text-red-800", bold: true },
  { label: "Hospitals Profile | Fina...", detail: "", color: "bg-green-100 border-green-300 text-green-900" },
  { label: "Other", detail: "", color: "bg-gray-100 border-gray-300 text-gray-600" },
];

const secondaryDests = [
  { label: "All Products | Quick Se...", detail: "38% / 9,144 clicks", color: "bg-red-100 border-red-300 text-red-800", bold: true },
  { label: "Hospitals | All Hospital ...", detail: "", color: "bg-green-100 border-green-300 text-green-900" },
];

const tertiaryDests = [
  { label: "No Next Ste...", color: "bg-gray-100 border-gray-300 text-gray-600" },
  { label: "Other", color: "bg-gray-100 border-gray-300 text-gray-600" },
  { label: "Other", color: "bg-gray-100 border-gray-300 text-gray-600" },
  { label: "Hospitals |...", color: "bg-green-100 border-green-300 text-green-900" },
  { label: "Other", color: "bg-gray-100 border-gray-300 text-gray-600" },
  { label: "Home |...", color: "bg-blue-100 border-blue-300 text-blue-800" },
  { label: "Other", color: "bg-gray-100 border-gray-300 text-gray-600" },
];

function AnimatedLine({ delay, width = 40 }: { delay: number; width?: number }) {
  return (
    <motion.div
      className="flex items-center"
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.3 }}
      style={{ originX: 0 }}
    >
      <div className="h-[2px] bg-gray-400" style={{ width }} />
      <div className="w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[6px] border-l-gray-400" />
    </motion.div>
  );
}

function Node({
  label,
  detail,
  color,
  delay,
  bold,
}: {
  label: string;
  detail?: string;
  color: string;
  delay: number;
  bold?: boolean;
}) {
  return (
    <motion.div
      className={`${nodeBase} ${color} ${bold ? "ring-2 ring-red-400" : ""} whitespace-nowrap`}
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.3 }}
    >
      <div className={bold ? "font-bold" : ""}>{label}</div>
      {detail && <div className="text-[10px] opacity-70 mt-0.5">{detail}</div>}
    </motion.div>
  );
}

export function UserFlowVisualization() {
  return (
    <div className="w-full overflow-x-auto p-6">
      <div className="min-w-[900px]">
        {/* Title */}
        <motion.p
          className="text-sm font-mono text-gray-400 mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Paths from Home Page
        </motion.p>

        <div className="flex items-start gap-0">
          {/* Column 1: Home Page */}
          <div className="flex flex-col items-end justify-center min-h-[400px] pt-16">
            <motion.div
              className={`${nodeBase} bg-white border-gray-300 text-gray-900`}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-800 rounded-sm" />
                <span className="font-bold">Home Page</span>
              </div>
              <div className="text-[10px] text-gray-500 mt-1">150k views</div>
            </motion.div>
          </div>

          {/* Line to middle */}
          <div className="flex flex-col justify-center min-h-[400px] pt-16">
            <AnimatedLine delay={0.3} width={60} />
          </div>

          {/* Column 2: All Products hub */}
          <div className="flex flex-col items-center justify-center min-h-[400px] pt-16">
            <motion.div
              className={`${nodeBase} bg-cyan-50 border-cyan-400 text-cyan-900 ring-2 ring-cyan-300`}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <div className="font-bold">All Products | Quick Se...</div>
              <div className="text-[10px] opacity-70 mt-0.5">52% / 78.2k clicks</div>
            </motion.div>

            {/* Branch lines going up and down */}
            <div className="flex flex-col gap-8 mt-6">
              <motion.div
                className="flex items-center gap-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                <div className="text-[10px] text-gray-400 font-mono">
                  <div>Hospitals | All Hospital ...</div>
                  <div className="text-gray-500">52% / 40.6k views</div>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center gap-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
              >
                <div className="text-[10px] text-gray-400 font-mono">
                  <div>Home | Quick Search R...</div>
                  <div className="text-gray-500">31% / 24.3k views</div>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center gap-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
              >
                <div className="text-[10px] text-gray-400 font-mono">
                  <div className="flex items-center gap-1">
                    <span>Untagged</span>
                  </div>
                  <div className="flex items-center gap-1 text-purple-400">
                    <span>Physician Group Profile ...</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center gap-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.9 }}
              >
                <div className="text-[10px] text-gray-400 font-mono">
                  <div>Hospitals | All Hospital ...</div>
                  <div className="text-gray-500">14% / 21.3k views</div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Lines to destinations */}
          <div className="flex flex-col gap-3 justify-start min-h-[400px] pt-8">
            {destinations.map((_, i) => (
              <div key={i} className="h-[36px] flex items-center">
                <AnimatedLine delay={0.8 + i * 0.1} width={30} />
              </div>
            ))}
          </div>

          {/* Column 3: First destinations */}
          <div className="flex flex-col gap-3 justify-start min-h-[400px] pt-8">
            {destinations.map((d, i) => (
              <Node
                key={i}
                label={d.label}
                detail={d.detail}
                color={d.color}
                delay={0.9 + i * 0.1}
                bold={d.bold}
              />
            ))}
          </div>

          {/* Lines to secondary */}
          <div className="flex flex-col gap-3 justify-start min-h-[400px] pt-8">
            {secondaryDests.map((_, i) => (
              <div key={i} className="h-[36px] flex items-center">
                <AnimatedLine delay={1.5 + i * 0.1} width={20} />
              </div>
            ))}
          </div>

          {/* Column 4: Secondary destinations */}
          <div className="flex flex-col gap-3 justify-start min-h-[400px] pt-8">
            {secondaryDests.map((d, i) => (
              <Node
                key={i}
                label={d.label}
                detail={d.detail}
                color={d.color}
                delay={1.6 + i * 0.1}
                bold={d.bold}
              />
            ))}
          </div>

          {/* Lines to tertiary */}
          <div className="flex flex-col gap-2 justify-start min-h-[400px] pt-8">
            {tertiaryDests.map((_, i) => (
              <div key={i} className="h-[28px] flex items-center">
                <AnimatedLine delay={1.8 + i * 0.08} width={15} />
              </div>
            ))}
          </div>

          {/* Column 5: Tertiary destinations */}
          <div className="flex flex-col gap-2 justify-start min-h-[400px] pt-8">
            {tertiaryDests.map((d, i) => (
              <Node
                key={i}
                label={d.label}
                color={d.color}
                delay={1.9 + i * 0.08}
              />
            ))}
          </div>
        </div>

        {/* Bottom annotation */}
        <motion.div
          className="mt-8 p-4 bg-yellow-50/10 border border-yellow-500/20 rounded-lg max-w-md"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 2.4 }}
        >
          <p className="text-[11px] text-gray-400 leading-relaxed">
            There seems to be a strong consensus that this is heavily used and should be moved up on the page.
          </p>
          <p className="text-[11px] text-gray-400 leading-relaxed mt-2">
            Also, we don&apos;t provide any in-profile links in this section (i.e. &quot;View more Financial Information and take the user to the Financials tab.&quot; Feels like a missed opportunity. I&apos;d like to view these metric sections as a preview and then navigate to the detailed subtabs. We have seen strong adoption of the work. Revenue Summary tab with the General Info section and hyperlinks.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
