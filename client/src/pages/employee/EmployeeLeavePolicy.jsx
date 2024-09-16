import React from 'react';
import { EmployeeHeader } from './components/EmployeeHeader';
import { EmployeeSideBar } from './components/EmployeeSideBar';

export const EmployeeLeavePolicy = () => {
    return (
        <>
            <div className="flex min-h-screen">
                {/* Sidebar with appropriate width */}
                <EmployeeSideBar />

                {/* Main content area */}
                <div className="flex-grow flex flex-col">
                    {/* Header */}
                    <EmployeeHeader />

                    {/* Main content */}
                    <div className="p-4 flex-grow">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold">Leave Policy</h2>
                        </div>

                        {/* Leave Policy Sections */}
                        <div className="space-y-6">
                            {/* Section 1: Casual Leaves */}
                            <section>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">Casual Leave Policy</h3>
                                <p className="text-gray-700">
                                    Only <span className="text-red-500 font-bold">2 casual leaves</span> are allowed per month. These leaves are intended for personal time off and should be planned <br /> and approved in advance whenever possible.
                                </p>
                                <p className="text-gray-700 mt-2">
                                    In case of an emergency, <span className="text-red-500 font-bold">casual leave cannot be taken</span>. Emergencies should be discussed with the admin to arrange alternate <br /> forms of leave if necessary.
                                </p>
                                <p className="text-gray-700 mt-2">
                                    Casual leaves <span className="text-red-500 font-bold">do not include public holidays</span> that are part of the company calendar.
                                </p>
                            </section>

                            {/* Section 2: Sick Leaves */}
                            <section>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">Sick Leave Policy</h3>
                                <p className="text-gray-700">
                                    Employees are entitled to <span className="text-red-500 font-bold">2 paid sick leaves</span> per month. These leaves can be taken if an employee is unwell and unable to work.
                                </p>
                                <p className="text-gray-700 mt-2">
                                    Sick leaves should be reported as soon as possible, with medical documentation provided for prolonged absences if required.
                                </p>
                            </section>

                            {/* Section 3: Leave Without Approval */}
                            <section>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">Leave Without Approval</h3>
                                <p className="text-gray-700">
                                    Taking leave without proper approval will result in <span className="text-red-500 font-bold">strict action</span> from the administration, potentially including penalties or salary deductions.
                                </p>
                                <p className="text-gray-700 mt-2">
                                    All leave requests must be approved by the administration to avoid any issues.
                                </p>
                            </section>

                            {/* Section 4: Public Holidays */}
                            <section>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">Public Holidays</h3>
                                <p className="text-gray-700">
                                    Public holidays as listed in the company calendar are <span className="text-red-500 font-bold">excluded from casual leaves</span>. Employees are encouraged to refer to the company<br /> calendar and plan their casual leaves accordingly.
                                </p>
                                <p className="text-gray-700 mt-2">
                                    Any leave requests overlapping with public holidays may be rejected or adjusted.
                                </p>
                            </section>

                            {/* Section 5: Additional Policies */}
                            <section>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">Additional Leave Policies</h3>
                                <p className="text-gray-700">
                                    Other types of leaves (such as maternity, unpaid, or emergency leaves) may be available depending on specific situations.<br /> Employees should consult HR for more details.
                                </p>
                                <p className="text-gray-700 mt-2">
                                    In case of any disputes or confusion regarding leave policies, employees are encouraged to contact HR for clarification.
                                </p>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
