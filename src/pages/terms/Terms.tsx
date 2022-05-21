import React from "react";
import { Link, useHistory } from "react-router-dom";
import { PRIVACY_URL, TESTNET_URL } from "../../urls";

const Terms = (): JSX.Element => {
    const isTestnet = useHistory().location.pathname.startsWith(TESTNET_URL);

    return (
        <div className="margin-y-auto">
            <div className="title">Terms and Conditions of Use</div>

            <div className="margin-y-auto fit-content terms-list">
                <h3>1. Terms</h3>
                <p>
                    By accessing this Website, accessible from https://splitz.app, you are agreeing
                    to be bound by these Website Terms and Conditions of Use and agree that you are
                    responsible for the agreement with any applicable local laws. If you disagree
                    with any of these terms, you are prohibited from accessing this site. The
                    materials contained in this Website are protected by copyright and trade mark
                    law.
                </p>
                <h3>2. Use License</h3>
                <p>
                    Permission is granted to temporarily download one copy of the materials on
                    Splitz's Website for personal, non-commercial transitory viewing only. This is
                    the grant of a license, not a transfer of title, and under this license you may
                    not:
                </p>
                <ul>
                    <li>modify or copy the materials;</li>
                    <li>use the materials for any commercial purpose or for any public display;</li>
                    <li>attempt to reverse engineer any software contained on Splitz's Website;</li>
                    <li>
                        remove any copyright or other proprietary notations from the materials; of
                    </li>
                    <li>
                        transferring the materials to another person or "mirror" the materials on
                        any other server.
                    </li>
                </ul>
                <p>
                    This will let Splitz to terminate upon violations of any of these restrictions.
                    Upon termination, your viewing right will also be terminated and you should
                    destroy any downloaded materials in your possession whether it is printed or
                    electronic format.
                </p>
                <h3>3. Disclaimer of warranties and Limitation of liability</h3>
                <p>
                    This website is provided by the authors "as is" and any express or implied
                    warranties, including, but not limited to, the implied warranties of
                    merchantability and fitness for a particular purpose are disclaimed. In no event
                    shall the authors be liable for any direct, indirect, incidental, special,
                    exemplary, or consequential damages (including, but not limited to, procurement
                    of substitute goods or services; loss of use, data, or profits; or business
                    interruption) however caused and on any theory of liability, whether in
                    contract, strict liability, or tort (including negligence or otherwise) arising
                    in any way out of the use of this website, even if advised of the possibility of
                    such damage.
                </p>
                <h3>4. Limitations </h3>
                <p>
                    splitz.app or its suppliers will not be hold accountable for any damages that
                    will arise with the use or inability to use the materials on Splitz's Website,
                    even if Splitz or an authorize representative of this Website has been notified,
                    orally or written, of the possibility of such damage. Some jurisdiction does not
                    allow limitations on implied warranties or limitations of liability for
                    incidental damages, these limitations may not apply to you.
                </p>
                <h3>5. Revisions and Errata </h3>
                <p>
                    The materials appearing on Splitz's Website may include technical,
                    typographical, or photographic errors. Splitz will not promise that any of the
                    materials in this Website are accurate, complete, or current. Splitz may change
                    the materials contained on its Website at any time without notice. Splitz does
                    not make any commitment to update the materials.
                </p>
                <h3>6. Links</h3>
                <p>
                    splitz.app has not reviewed all of the sites linked to its Website and is not
                    responsible for the contents of any such linked site. The presence of any link
                    does not imply endorsement by Splitz of the site. The use of any linked website
                    is at the user's own risk.
                </p>
                <h3>7. Site Terms of Use </h3>
                <p>
                    Modifications splitz.app may revise these Terms of Use for its Website at any
                    time without prior notice. By using this Website, you are agreeing to be bound
                    by the current version of these Terms and Conditions of Use.
                </p>
                <h3>8. Your Privacy </h3>
                <p>
                    Please read our{" "}
                    <Link to={isTestnet ? TESTNET_URL + PRIVACY_URL : PRIVACY_URL}>
                        Privacy Policy
                    </Link>
                    .
                </p>
                <h3>9. Copyright Complaints </h3>
                <p>
                    Splitz respects the intellectual property of others. If you believe that your
                    work has been copied in a way that constitutes copyright infringement, please
                    <a href="mailto:contact@splitz.app"> email us</a>.
                </p>
            </div>
        </div>
    );
};

export default Terms;
